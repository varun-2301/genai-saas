import { generateChat } from '../services/openai.js'
import { savePrompt } from './prompt.js'
import { handleSuccessResponse, notFound } from '../utils/responseHelper.js'

const resumePrompt = (resumeText, jobDescription) => {
    return `You are an expert career coach. Review the following resume and provide:
            1. Key Strengths
            2. Weaknesses
            3. Suggestions for improvement
            4. If a job description is provided, also evaluate fit.

            Resume:
            ${resumeText}

            Job Description (if any):
            ${jobDescription || "Not provided"}`
}

const scorecardPrompt = (resumeText, jobDescription) => {
    return `You are an ATS (Applicant Tracking System) and Resume Expert.
            Analyze the resume and return structured results in JSON format with:
            {
                "atsScore": number (0-100),
                "skillsMatched": [list of matched skills],
                "missingSkills": [list of missing but important skills],
                "improvementSuggestions": [list of suggestions]
            }

            Resume:
            ${resumeText}

            Job Description (if any):
            ${jobDescription || "Not provided"}`
}

const getResumeReview = async (resumeText, jobDescription) => {
    try {
        const resumePromptData = resumePrompt(resumeText, jobDescription)
        const aiResponse = await generateChat(resumePromptData)
        return aiResponse
        
    } catch (error) {
        console.error("Error in resumeReview service:", error)
        throw new Error("Failed to review resume")
    }
}


const getResumeScorecard = async(resumeText, jobDescription) => {
    try {
        const scorecardPromptData = scorecardPrompt(resumeText, jobDescription)
        const aiScoreResponse = await generateChat(scorecardPromptData)
        return JSON.parse(aiScoreResponse)

    } catch (error) {
        console.error("Error in resumeScorecard service:", error)
        throw new Error("Failed to generate resume scorecard")
    }
}


export const resume = async(req, res, next) => {
    try {
        const { resumeText, jobDescription } = req.body

        if (!resumeText) {
            throw notFound('Resume text is required');
        }

        // Step 1: Call review logic
        const review = await getResumeReview(resumeText, jobDescription)

        // // Step 2: Call scorecard logic
        const scorecard = await getResumeScorecard(resumeText, jobDescription)
        
        // Step 3: Save Prompt + Increment Usage
        await savePrompt(req.user.uid, resumePrompt(resumeText, jobDescription), review, scorecard, 'resume')

        // Step 4: Combine into one response
        return handleSuccessResponse(res, { review, scorecard })
        
    } catch (err) {
        console.error("Error in /review:", err)
        next(err)
    }
}