import express from 'express'
import { verifyToken } from '../middlewares/auth.js'
import { saveUser, getUser, getUsage, downgradeUserPlan } from '../controllers/user.js'
import { asyncHandler } from '../middlewares/wrapper.js'

const router = express.Router()

router.post('/save-user', asyncHandler(saveUser))

router.get('/me', verifyToken, asyncHandler(getUser))

router.get("/usage", verifyToken, asyncHandler(getUsage))

router.get('/downgrade-plan', verifyToken, asyncHandler(downgradeUserPlan))

export default router
