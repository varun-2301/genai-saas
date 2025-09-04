import express from 'express'
import { verifyToken } from '../middlewares/auth.js'
import { saveUser, getUser, getUsage, downgradeUserPlan } from '../controllers/user.js'

const router = express.Router()

router.post('/save-user', saveUser)

router.get('/me', verifyToken, getUser)

router.get("/usage", verifyToken, getUsage)

router.get('/downgrade-plan', verifyToken, downgradeUserPlan)

export default router
