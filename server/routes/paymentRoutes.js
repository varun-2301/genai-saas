import express from 'express'
import { verifyToken } from '../middlewares/auth.js'
import { createCheckoutSession } from '../controllers/payment.js'

const router = express.Router()

router.post('/create-checkout-session', verifyToken, createCheckoutSession)

export default router
