import User from '../models/User.js'
import { badRequest } from '../utils/responseHelper.js'

export const checkUsageLimit = (type) => {
    return async (req, res, next) => {
        const user = await User.findOne({ uid: req.user.uid })
        if (!user) return res.status(404).json({ error: 'User not found' })

        const errorMessage = `${user.plan} Tier Exhausted`

        if (type === "prompt" && user.usage.promptCount >= user.limits.promptLimit)
            throw badRequest(errorMessage)

        if (type === "rag" && user.usage.ragCount >= user.limits.ragLimit)
            throw badRequest(errorMessage)

        req.userData = user
        next()
    }
}
