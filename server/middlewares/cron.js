import { unauthorizedRequest } from "../utils/responseHelper.js"

export const verifyCronSecret = (req, res, next) => {
    const secret = req.header("x-cron-secret");
    if (!secret || secret !== process.env.CRON_SECRET) {
        throw unauthorizedRequest('Unauthorized')
    }
    next()
}