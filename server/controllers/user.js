import User from '../models/User.js'
import admin from '../utils/firebase-admin.js'
import { handleSuccessResponse, notFound, unauthorizedRequest } from '../utils/responseHelper.js'

export const saveUser = async (req, res, next) => {
    
    try {
        const { idToken, user } = req.body
        if (!idToken) throw notFound('Token not found')
        
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        const { uid, email } = decodedToken

        let userRes = await User.findOne({ uid })
        if (!userRes) {
            userRes = await User.create({ uid, email, name: user?.displayName || 'Guest', photoUrl: user?.photoURL || '' })
        }

        //res.status(200).json({ message: "User stored", userRes })
        return handleSuccessResponse(res, userRes)
    } catch (error) {
        console.error("Error verifying Firebase ID token:", error)
        //res.status(401).json({ error: "Invalid ID token" })

        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        if (!req.user || !req.user.uid) {
            //return res.status(401).json({ error: "Unauthorized" })
            throw unauthorizedRequest('Unauthorized')
        }

        const user = await User.findOne({ uid: req.user.uid })
        //res.status(200).json({ message: "User fetched", user })
        return handleSuccessResponse(res, {user})

    } catch (error) {
        //return res.status(500).json({ error: "Server error" })
        next(error)
    }
}

export const getUsage = async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.user.uid })
        if (!user) 
            throw notFound('User not found')

        const MAX_FREE_LIMIT = 5 // central limit here

        // res.status(200).json({
        //     promptsUsed: user.promptsUsed,
        //     remaining: Math.max(0, MAX_FREE_LIMIT - user.promptsUsed),
        //     maxLimit: MAX_FREE_LIMIT,   // ✅ send maximum
        // })

        return handleSuccessResponse(res, {
            promptsUsed: user.promptsUsed,
            remaining: Math.max(0, MAX_FREE_LIMIT - user.promptsUsed),
            maxLimit: MAX_FREE_LIMIT,   // ✅ send maximum
        })
    } catch (err) {
        //res.status(500).json({ error: "Failed to fetch usage" })
        next(err)
    }
}