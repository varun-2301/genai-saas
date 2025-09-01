import { stripe } from '../utils/stripe.js'
import User from '../models/User.js'
import { handleSuccessResponse } from '../utils/responseHelper.js'

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
                        name: 'Pro Plan',
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

        //res.json({ id: session.id }) // ✅ Return only the ID
        return handleSuccessResponse(res, { id: session.id })
    } catch (err) {
        console.error("Stripe checkout error:", err.message)
        next(err);
    }
}

export const paymentWebhook = async (req, res, next) => {
    try {
        const sig = req.headers["stripe-signature"]
        
        let event
        event = stripe.webhooks.constructEvent(
            req.body,               // raw body required
            sig,
            process.env.STRIPE_WEBHOOK_KEY
        )
    } catch (err) {
        console.error("⚠️ Webhook signature verification failed:", err.message)
        //return res.status(400).send(`Webhook Error: ${err.message}`)
        next(err)
    }

    // ✅ Handle different events
    if (event.type === "checkout.session.completed") {
        const session = event.data.object

        try {
            // Find user by email (or uid if you passed metadata)
            const user = await User.findOne({ email: session.customer_email })

            if (user) {
                user.isPro = true // example: mark as Pro plan
                await user.save()
            }

            //console.log(`✅ Payment successful for ${session.customer_email}`)
            return handleSuccessResponse(res, {message : `✅ Payment successful for ${session.customer_email}`})
        } catch (err) {
            console.error("❌ Error updating user after payment:", err.message)
            next(err)
        }
    }

    //res.status(200).json({ received: true })
    return handleSuccessResponse(res, {received : true})
}