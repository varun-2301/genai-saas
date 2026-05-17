// server/app.js
import express from 'express'
import cors from 'cors'
import './utils/loadEnv.js'

import userRoutes from './routes/userRoutes.js'
import promptRoutes from './routes/promptRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'
import webhookRoutes from './routes/webhookRoutes.js'
import ragRoutes from './routes/ragRoutes.js'
import imageRoutes from './routes/imageRoutes.js'
import cronRoutes from './routes/cronRoutes.js'

import { handleErrorResponse, notFound } from './utils/responseHelper.js'

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL,
}))

// Webhook first
app.use("/api/payments/webhook", webhookRoutes)

app.use(express.json())

// Routes
app.use('/api/user', userRoutes)
app.use('/api/prompts', promptRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/rag', ragRoutes)
app.use('/api/images', imageRoutes)
app.use('/api/cron', cronRoutes)

// Add a safe health route
app.get("/health", (req, res) => {
    res.status(200).send("OK")
})

app.use((error, req, res, next) => {
    console.log("GLOBAL ERROR HANDLER:", error.message, error.status)
    handleErrorResponse(res, error)
})

export default app
