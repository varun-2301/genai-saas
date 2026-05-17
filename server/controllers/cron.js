import User from "../models/User.js"
import { handleSuccessResponse } from "../utils/responseHelper.js"

// helper: start of today in IST
function startOfTodayIST() {
    const now = new Date();
    const IST_OFFSET = 330; // minutes (5 hours 30 minutes)
    
    // Get the current date components in UTC
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth();
    const date = now.getUTCDate();
    
    // Create 00:00:00 IST for today's date
    // 00:00:00 IST = 18:30:00 UTC of the same day
    // So we create a UTC date for 18:30:00 of the current day
    return new Date(Date.UTC(year, month, date, 18, 30, 0, 0));
}

export const resetLimits = async(req, res, next) => {
    try {
        const todayIST = startOfTodayIST()

        const result = await User.updateMany(
            {
                "usage.lastReset": { $lt: todayIST },
                $or: [
                    { $expr: { $gte: ["$usage.promptCount", "$limits.promptLimit"] } },
                    { $expr: { $gte: ["$usage.ragCount", "$limits.ragLimit"] } },
                    { $expr: { $gte: ["$usage.imageCount", "$limits.imageLimit"] } }
                ]
            },
            {
                $set: {
                    "usage.promptCount": 0,
                    "usage.ragCount": 0,
                    "usage.imageCount": 0,
                    "usage.lastReset": new Date(),
                }
            }
        )

        const responseData = {
            matched: result.matchedCount ?? result.n,
            modified: result.modifiedCount ?? result.nModified,
        }

        return handleSuccessResponse(res, responseData)
    } catch (err) {
        console.error("Reset limits error:", err);
        return next(err)
    }
}

