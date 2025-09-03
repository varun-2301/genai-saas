import mongoose from 'mongoose'
import { PLANS } from '../utils/constants.js'

const userSchema = new mongoose.Schema({
    uid: { type: String, unique: true },
    name: String,
    email: { type: String, unique: true },
    photoUrl: String,
    plan: { type: String, enum: [PLANS.FREE_PLAN_NAME.name, PLANS.PAID_PLAN_NAME.name], default: PLANS.FREE_PLAN_NAME.name },
    limits: {
        promptLimit: { type: Number, default: PLANS.FREE_PLAN_NAME.promptLimit },
        ragLimit: { type: Number, default: PLANS.FREE_PLAN_NAME.ragLimit },
    },
    usage: {
        promptCount: { type: Number, default: 0 },
        ragCount: { type: Number, default: 0 },
        lastReset: { type: Date, default: Date.now },
    },

}, { timestamps: true })

export default mongoose.model('User', userSchema)
