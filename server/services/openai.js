import { openai } from '../utils/openai.js'
import { notFound } from '../utils/responseHelper.js';

export const generateChat = async (prompt) => {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: "user", content: prompt }]
        });

        if (!completion.choices || completion.choices.length === 0) {
            return next(notFound("Output not generated"))
        }

        return completion.choices[0].message.content

    } catch (error) {
        console.error("Error calling OpenAI:", error)
        return next(error)
    }
}