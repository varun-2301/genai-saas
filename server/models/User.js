import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    uid: { type: String, unique: true },
    name: String,
    email: { type: String, unique: true },
    photoUrl: String,
    isPro: { type: Boolean, default: false },
    promptsUsed: { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.model('User', userSchema)
