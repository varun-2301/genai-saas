import express from 'express'
import User from '../models/User.js'
import { verifyToken } from '../middlewares/auth.js'

const router = express.Router()

router.post('/save-user', verifyToken, async (req, res) => {
    const { email, uid } = req.user

    let user = await User.findOne({ uid })
    if (!user) {
        user = await User.create({ uid, email })
    }

    res.json(user)
})

router.get('/me', verifyToken, async (req, res) => {
    const user = await User.findOne({ uid: req.user.uid })
    res.json(user)
})

export default router
