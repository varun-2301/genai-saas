import express from 'express'
import User from '../models/User.js'
import { verifyToken } from '../middlewares/auth.js'
import admin from '../utils/firebase-admin.js'

const router = express.Router()

router.post('/save-user', async (req, res) => {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ error: 'Missing ID token' });

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        const { uid, email } = decodedToken;

        let user = await User.findOne({ uid });
        if (!user) {
            user = await User.create({ uid, email });
        }

        return res.status(200).json({ message: "User stored", user });
    } catch (error) {
        console.error("Error verifying Firebase ID token:", error);
        return res.status(401).json({ error: "Invalid ID token" });
    }
})

router.get('/me', verifyToken, async (req, res) => {
    const user = await User.findOne({ uid: req.user.uid })
    return res.status(200).json({ message: "User fetched", user });
})

router.get("/usage", verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.user.uid });
        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json({
            promptsUsed: user.promptsUsed,
            remaining: Math.max(0, 5 - user.promptsUsed),
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch usage" });
    }
});

export default router
