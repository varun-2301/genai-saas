import { stripe } from '../utils/stripe.js'
import User from '../models/User.js'

export const createCheckoutSession = async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.user.uid })

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
            success_url: 'http://localhost:5173/dashboard',
            cancel_url: 'http://localhost:5173/',
        })

        res.json({ id: session.id }) // ✅ Return only the ID
    } catch (err) {
        console.error("Stripe checkout error:", err.message)
        return res.status(500).json({ error: "Failed to create checkout session" })
    }
}

export const paymentWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"]
    
    let event
    try {
        event = stripe.webhooks.constructEvent(
            req.body,               // raw body required
            sig,
            process.env.STRIPE_WEBHOOK_SECRET // get from Stripe Dashboard
        )
    } catch (err) {
        console.error("⚠️ Webhook signature verification failed:", err.message)
        return res.status(400).send(`Webhook Error: ${err.message}`)
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

            console.log(`✅ Payment successful for ${session.customer_email}`)
        } catch (err) {
            console.error("❌ Error updating user after payment:", err.message)
        }
    }

    res.status(200).json({ received: true })
}