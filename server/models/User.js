import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    uid: { type: String, unique: true },
    email: String,
    isPro: { type: Boolean, default: false },
    promptsUsed: { type: Number, default: 0 },
    stripeCustomerId: String,
}, { timestamps: true })

export default mongoose.model('User', userSchema)
