import express from 'express'
import { verifyToken } from '../middlewares/auth.js'
import { checkUsageLimit } from '../middlewares/usageLimit.js'
import { resume } from '../controllers/resume.js'

const router = express.Router()

router.post('/review', verifyToken, checkUsageLimit('prompt'), resume)

export default router
