import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import './utils/loadEnv.js'

import authRoutes from './routes/authRoutes.js'
import promptRoutes from './routes/promptRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL, // <-- must match frontend exactly
}));
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/prompts', promptRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/resume', resumeRoutes)

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected')
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server running on port ${process.env.PORT}`)
        })
}).catch(err => console.error(err))
