import { openai } from '../utils/openai.js'

export const generateChat = async (prompt) => {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: "user", content: prompt }]
        });

        return completion.choices[0].message.content

    } catch (error) {
        console.error("Error calling OpenAI:", error)
        throw new Error("Failed to get response from OpenAI")
    }
}