import express from 'express'
import { stripe } from '../utils/stripe.js'
import { verifyToken } from '../middlewares/auth.js'
import User from '../models/User.js'

const router = express.Router()

router.post('/create-checkout-session', verifyToken, async (req, res) => {
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

    res.json({ url: session.url })
})

export default router
