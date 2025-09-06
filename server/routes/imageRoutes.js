import express from 'express'
import { verifyToken } from '../middlewares/auth.js'
import { generateImage } from '../controllers/image.js'
import { checkUsageLimit } from '../middlewares/usageLimit.js'

const router = express.Router()

router.post('/', verifyToken, checkUsageLimit('image'), generateImage)

export default router
