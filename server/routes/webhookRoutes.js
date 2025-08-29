import express from 'express'
import { paymentWebhook } from '../controllers/payment.js'

const router = express.Router()

router.post("/webhook", express.raw({ type: "application/json" }), paymentWebhook)

export default router
