import express from 'express'
import Prompt from '../models/Prompt.js'
import { verifyToken } from '../middlewares/auth.js'
import { checkUsageLimit } from '../middlewares/usageLimit.js'
import { openai } from '../utils/openai.js'

const router = express.Router()

router.post('/generate', verifyToken, checkUsageLimit, async (req, res) => {
    const { prompt } = req.body

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
    })

    const output = response.choices[0].message.content

    // Save Prompt + Increment Usage
    await Prompt.create({ uid: req.user.uid, prompt, response: output })
    req.userData.promptsUsed++
    await req.userData.save()

    res.json({ result: output })
})

router.get('/history', verifyToken, async (req, res) => {
    const prompts = await Prompt.find({ uid: req.user.uid }).sort({ createdAt: -1 })
    res.json(prompts)
})

export default router
