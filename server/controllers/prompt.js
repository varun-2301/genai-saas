import Prompt from '../models/Prompt.js'
import { generateChat } from '../services/openai.js'

export const generatePrompt = async(req, res) => {
    try {
        const { prompt } = req.body
        
        const output = await generateChat(prompt)
    
        // Save Prompt + Increment Usage
        await Prompt.create({ uid: req.user.uid, prompt, response: output })
        req.userData.promptsUsed++
        await req.userData.save()
    
        res.json({ result: output })
    } catch (error) {
        console.error("Error in /generate:", error)
        res.status(500).json({ error: "Failed to generate prompt" })
    }
}

export const getPromptHistory = async(req, res) => {
    try{
        const prompts = await Prompt.find({ uid: req.user.uid }).sort({ createdAt: -1 })
        res.json(prompts)
    } catch(err){
        res.status(500).json({ error: "Failed to fetch prompt history" })
    }
}