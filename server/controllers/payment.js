import { stripe } from '../utils/stripe.js'
import User from '../models/User.js'
import { handleSuccessResponse } from '../utils/responseHelper.js'
import { PLANS } from '../utils/constants.js'

export const createCheckoutSession = async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: req.user.email,
            line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: PLANS.PAID_PLAN_NAME.name,
                    },
                    unit_amount: 1000,
                },
                quantity: 1,
            },
            ],
            mode: 'payment',
            success_url: process.env.FRONTEND_URL + '/dashboard',
            cancel_url: process.env.FRONTEND_URL + '/pricing',
        })

        return handleSuccessResponse(res, { id: session.id })
    } catch (err) {
        console.error("Stripe checkout error:", err.message)
        next(err);
    }
}

export const paymentWebhook = async (req, res, next) => {
    const sig = req.headers["stripe-signature"]
    let stripeEvent
    try {

        stripeEvent = stripe.webhooks.constructEvent(
            req.body,               // raw body required
            sig,
            process.env.STRIPE_WEBHOOK_KEY
        )
    } catch (err) {
        console.error("⚠️ Webhook signature verification failed:", err.message)
        next(err)
    }

    // ✅ Handle different events
    if (stripeEvent.type === "checkout.session.completed") {
        const session = stripeEvent.data.object

        try {
            // Find user by email (or uid if you passed metadata)
            const user = await User.findOne({ email: session.customer_email })

            if (user) {
                user.plan = PLANS.PAID_PLAN_NAME.name
                user.limits = {
                    promptLimit: PLANS.PAID_PLAN_NAME.promptLimit,
                    ragLimit: PLANS.PAID_PLAN_NAME.ragLimit,
                    imageLimit: PLANS.PAID_PLAN_NAME.imageLimit
                }

                user.usage = { promptCount: 0, ragCount: 0 }

                await user.save()
            }

            return handleSuccessResponse(res, {message : `✅ Payment successful for ${session.customer_email}`})
        } catch (err) {
            console.error("❌ Error updating user after payment:", err.message)
            next(err)
        }
    }

    return handleSuccessResponse(res, {received : true})
}