import { openai } from "../utils/openai.js"
import { badRequest, handleSuccessResponse } from "../utils/responseHelper.js"
import { savePrompt } from "./prompt.js"
import { incrementUserAIUsage } from "./user.js"

export const generateImage = async(req, res, next) => {
    try {
        const { prompt } = req.body
        if(!prompt)
            return next(badRequest('Prompt was not provided'))

        const response = await openai.images.generate({
            model: "dall-e-2",   // DALL·E model
            prompt,
            size: "1024x1024",   // Options: '1024x1024', '1024x1792', and '1792x1024'
        })

        await savePrompt(req.user.uid, prompt, response.data[0].url, '', 'image')
        await incrementUserAIUsage(req.user.uid, 'image')

        return handleSuccessResponse(res, { imageUrl: response.data[0].url })
    } catch (error) {
        return next(error)
    }
}