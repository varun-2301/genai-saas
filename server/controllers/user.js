import User from '../models/User.js'
import admin from '../utils/firebase-admin.js'

export const saveUser = async (req, res) => {
    const { idToken } = req.body
    if (!idToken) return res.status(400).json({ error: 'Missing ID token' })

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        const { uid, email } = decodedToken

        let user = await User.findOne({ uid })
        if (!user) {
            user = await User.create({ uid, email })
        }

        res.status(200).json({ message: "User stored", user })
    } catch (error) {
        console.error("Error verifying Firebase ID token:", error)
        res.status(401).json({ error: "Invalid ID token" })
    }
}

export const getUser = async (req, res) => {
    try {
        if (!req.user || !req.user.uid) {
            return res.status(401).json({ error: "Unauthorized" })
        }

        const user = await User.findOne({ uid: req.user.uid })
        res.status(200).json({ message: "User fetched", user })

    } catch (error) {
        return res.status(500).json({ error: "Server error" }) 
    }
}

export const getUsage = async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.user.uid })
        if (!user) return res.status(404).json({ error: "User not found" })

        const MAX_FREE_LIMIT = 5 // central limit here

        res.status(200).json({
            promptsUsed: user.promptsUsed,
            remaining: Math.max(0, MAX_FREE_LIMIT - user.promptsUsed),
            maxLimit: MAX_FREE_LIMIT,   // ✅ send maximum
        })
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch usage" })
    }
}