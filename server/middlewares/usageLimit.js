import User from '../models/User.js'

export const checkUsageLimit = async (req, res, next) => {
    const user = await User.findOne({ uid: req.user.uid })
    if (!user) return res.status(404).json({ error: 'User not found' })

    if (!user.isPro && user.generationsUsed >= 5) {
        return res.status(403).json({ error: 'Free tier exhausted' })
    }

    req.dbUser = user
    next()
}
