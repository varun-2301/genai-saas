import express from 'express'
import { paymentWebhook } from '../controllers/payment.js'

const router = express.Router()

router.post("/", express.raw({ type: "application/json" }), paymentWebhook)

export default router
