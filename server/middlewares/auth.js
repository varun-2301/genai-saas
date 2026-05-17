import admin from '../utils/firebase-admin.js'
import { invalidRequest, notFound, unauthorizedRequest } from '../utils/responseHelper.js'
import { asyncHandler } from './wrapper.js'

export const verifyToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer "))
        throw notFound('No token') // throw instead of next()

    const token = authHeader.split(" ").slice(1).join(" ").trim()
    if (!token)
        throw invalidRequest('Empty token')

    const decodedToken = await admin.auth().verifyIdToken(token)
    req.user = decodedToken

    next()
})
