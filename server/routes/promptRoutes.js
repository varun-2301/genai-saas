import express from 'express'
import { verifyToken } from '../middlewares/auth.js'
import { checkUsageLimit } from '../middlewares/usageLimit.js'
import { generatePrompt, getPromptHistory } from '../controllers/prompt.js'

const router = express.Router()

router.post('/generate', verifyToken, checkUsageLimit('prompt'), generatePrompt)

router.get('/history', verifyToken, getPromptHistory)

export default router
