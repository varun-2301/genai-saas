import { openai } from "../utils/openai.js"
import { badRequest, handleSuccessResponse } from "../utils/responseHelper.js"
import { savePrompt } from "./prompt.js"
import { incrementUserAIUsage } from "./user.js"

export const generateImage = async(req, res, next) => {
    try {
        // setTimeout(() => {
        //     return handleSuccessResponse(res, { imageUrl: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-dkx1bOfDkosNVpWvAFzzMnvT/user-MCKomUE34xuqR6vZdZzBJgLC/img-AQfoDtbPgW0nSxLP5Mvy0lYZ.png?st=2025-09-06T02%3A06%3A09Z&se=2025-09-06T04%3A06%3A09Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-06T03%3A06%3A09Z&ske=2025-09-07T03%3A06%3A09Z&sks=b&skv=2024-08-04&sig=SVOlgqgkywSNXW%2BKrpGxddOAl2pyKA4XZLByMjxd2/U%3D' })
        // }, 10000)

        const { prompt } = req.body
        if(!prompt)
            throw badRequest('Prompt was not provided')

        const response = await openai.images.generate({
            model: "dall-e-2",   // DALL·E model
            prompt,
            size: "1024x1024",   // Options: '1024x1024', '1024x1792', and '1792x1024'
        })

        await savePrompt(req.user.uid, prompt, response.data[0].url, '', 'image')
        await incrementUserAIUsage(req.user.uid, 'image')

        return handleSuccessResponse(res, { imageUrl: response.data[0].url })
    } catch (error) {
        next(error)
    }
}