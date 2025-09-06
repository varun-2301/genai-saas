import User from "../models/User.js"
import { handleSuccessResponse } from "../utils/responseHelper.js"

// helper: start of today in IST
function startOfTodayIST() {
    const now = new Date();
    const IST_OFFSET = 330; // minutes
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    const ist = new Date(utcMs + IST_OFFSET * 60000);
    ist.setHours(0, 0, 0, 0);
    return new Date(ist.getTime() - IST_OFFSET * 60000);
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
        next(err)
    }
}

