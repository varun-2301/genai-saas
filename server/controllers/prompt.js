import Prompt from '../models/Prompt.js'
import User from '../models/User.js'
import { generateChat } from '../services/openai.js'
import { handleSuccessResponse } from '../utils/responseHelper.js'
import { incrementUserAIUsage } from './user.js'

export const generatePrompt = async(req, res, next) => {
    try {
        const { prompt } = req.body
        
        const output = await generateChat(prompt)
        
        // Save Prompt + Increment Usage
        await savePrompt(req.user.uid, prompt, output)
        await incrementUserAIUsage(req.user.uid)
    
        return handleSuccessResponse(res, { result: output })
    } catch (err) {
        console.error("Error in /generate:", err)
        next(err)
    }
}

export const getPromptHistory = async(req, res) => {
    try{
        const prompts = await Prompt.find({ uid: req.user.uid }).sort({ createdAt: -1 })
        return handleSuccessResponse(res, prompts)
    } catch(err){
        next(err)
    }
}

export const savePrompt = async(uid, prompt, response, scorecard = '', type = 'prompt') => {
    try {
        let user = await User.findOne({ uid })

        // Save Prompt + Increment Usage
        await Prompt.create({ 
            uid, 
            userId  : user._id, 
            prompt, 
            response,
            scorecard,
            type
        })
        
        return true
    } catch (err) {
        console.error("Error in /generate:", err)
        return false
    }
}