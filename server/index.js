import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import './utils/loadEnv.js'

import userRoutes from './routes/userRoutes.js'
import promptRoutes from './routes/promptRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'
import webhookRoutes from './routes/webhookRoutes.js'
import ragRoutes from './routes/ragRoutes.js'
import imageRoutes from './routes/imageRoutes.js'
import cronRoutes from './routes/cronRoutes.js'

import { handleErrorResponse } from './utils/responseHelper.js'

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL, // <-- must match frontend exactly
}));

// Mount webhook first (needs raw body)
app.use("/api/payments/webhook", webhookRoutes);

app.use(express.json())

// Routes
app.use('/api/user', userRoutes)
app.use('/api/prompts', promptRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/rag', ragRoutes)
app.use('/api/images', imageRoutes)
app.use('/api/cron', cronRoutes)

app.use((error, req, res, next) => {
    handleErrorResponse(res, error)
    next()
})

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server running on port ${process.env.PORT}`)
        })
    }).catch(err => console.error('MongoDB Connection Error',err))
