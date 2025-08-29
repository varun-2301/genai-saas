import express from 'express'
import { verifyToken } from '../middlewares/auth.js'
import { saveUser, getUser, getUsage } from '../controllers/user.js'

const router = express.Router()

router.post('/save-user', saveUser)

router.get('/me', verifyToken, getUser)

router.get("/usage", verifyToken, getUsage)

export default router
