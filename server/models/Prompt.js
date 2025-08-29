import mongoose from 'mongoose'

const promptSchema = new mongoose.Schema({
    uid: String,
    prompt: String,
    response: String,
    scrorecard: Object,
}, { timestamps: true })

export default mongoose.model('Prompt', promptSchema)
