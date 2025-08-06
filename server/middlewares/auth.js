import admin from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'

// if (!admin.apps.length) {
//     admin.initializeApp()
// }

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ error: 'No token' })

    const token = authHeader.split(' ')[1]
    try {
        const decodedToken = await getAuth().verifyIdToken(token)
        req.user = decodedToken

        // req.user = {
        //     uid: 'test123',
        //     email: 'test@example.com',
        // }
        next()
    } catch {
        return res.status(403).json({ error: 'Invalid token' })
    }
}
