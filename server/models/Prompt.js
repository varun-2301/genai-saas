import mongoose from 'mongoose'

const promptSchema = new mongoose.Schema({
    uid: { type: String, required: true }, // Firebase UID
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // DB reference
    type: { type: String, enum: ["prompt", "resume"], default: "prompt" },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    scorecard: { type: Object }, // only for resume analyses
}, { timestamps: true })

export default mongoose.model('Prompt', promptSchema)
