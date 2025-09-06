import User from '../models/User.js'
import { PLANS } from '../utils/constants.js'
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
        
        let type = req.query['type[]']
        if (!type) {
            type = []
        } else if (!Array.isArray(type)) {
            type = [type]
        }

        let responseData = {}
        if(type.length > 0 && type.includes('prompt')){
            responseData.promptUsed = user.usage.promptCount
            responseData.promptRemaining = Math.max(0, user.limits.promptLimit - user.usage.promptCount)
            responseData.promptMaxLimit = user.limits.promptLimit
        }

        if(type.length > 0 && type.includes('rag')){
            responseData.ragUsed = user.usage.ragCount
            responseData.ragRemaining = Math.max(0, user.limits.ragLimit - user.usage.ragCount)
            responseData.ragMaxLimit = user.limits.ragLimit
        }
        
        if(type.length > 0 && type.includes('image')){
            responseData.imageUsed = user.usage.imageCount
            responseData.imageRemaining = Math.max(0, user.limits.imageLimit - user.usage.imageCount)
            responseData.imageMaxLimit = user.limits.imageLimit
        }

        return handleSuccessResponse(res, responseData)
    } catch (err) {
        next(err)
    }
}

export const incrementUserAIUsage = async(uid, type) => {
    try {
        // Increment Usage
        let user = await User.findOne({ uid })
        if(user){
            if(type === 'prompt')
                user.usage.promptCount++
            else if(type === 'rag')
                user.usage.ragCount++
            else if(type === 'image')
                user.usage.imageCount++

            await user.save()
            return true
        }

        return false
    } catch (err) {
        console.error("Error in user usage increment:", err)
        return false
    }
}

export const downgradeUserPlan = async(req, res, next) => {
    try {
        const user = await User.findOne({ uid: req.user.uid })
        if (!user) 
            throw notFound('User not found')

        user.plan = PLANS.FREE_PLAN_NAME.name
        user.limits = {
            promptLimit: PLANS.FREE_PLAN_NAME.promptLimit,
            ragLimit: PLANS.FREE_PLAN_NAME.ragLimit,
        }

        user.usage = { promptCount: 0, ragCount: 0 }
        
        await user.save()

        return handleSuccessResponse(res, {message : "User Plan Downgraded Successfully"})
    } catch (error) {
        next(error)
    }
}