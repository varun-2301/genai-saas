import User from '../models/User.js'
import admin from '../utils/firebase-admin.js'
import { handleSuccessResponse, notFound, unauthorizedRequest } from '../utils/responseHelper.js'

export const saveUser = async (req, res, next) => {
    try {
        const { idToken, user } = req.body
        if (!idToken) 
            throw notFound('Token not found')
        
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        const { uid, email } = decodedToken

        let userRes = await User.findOne({ uid })
        if (!userRes) {
            userRes = await User.create({ 
                uid, 
                email, 
                name: user?.displayName || 'Guest', 
                photoUrl: user?.photoURL || '' 
            })
        }

        return handleSuccessResponse(res, userRes)
    } catch (error) {
        console.error("Error verifying Firebase ID token:", error)
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        if (!req.user || !req.user.uid)
            throw unauthorizedRequest('Unauthorized')

        const user = await User.findOne({ uid: req.user.uid })
        return handleSuccessResponse(res, {user})

    } catch (error) {
        next(error)
    }
}

export const getUsage = async (req, res, next) => {
    try {
        const user = await User.findOne({ uid: req.user.uid })
        if (!user) 
            throw notFound('User not found')

        const MAX_FREE_LIMIT = 5 // central limit here

        return handleSuccessResponse(res, {
            promptsUsed: user.promptsUsed,
            remaining: Math.max(0, MAX_FREE_LIMIT - user.promptsUsed),
            maxLimit: MAX_FREE_LIMIT,   // ✅ send maximum
        })
    } catch (err) {
        next(err)
    }
}

export const incrementUserAIUsage = async(uid) => {
    try {
        // Increment Usage
        let user = await User.findOne({ uid })
        if(user){
            user.promptsUsed++
            await user.save()
            return true
        }

        return false
    } catch (err) {
        console.error("Error in user usage increment:", err)
        return false
    }
}