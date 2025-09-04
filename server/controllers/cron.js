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

export const resetLimits = async(req, res) => {
    try {
        const todayIST = startOfTodayIST()

        const result = await User.updateMany(
            {
                "usage.lastReset": { $lt: todayIST },
                $or: [
                    { "usage.promptCount": { $gte: "$limits.promptLimit" } }, // can't use field ref in query
                    { "usage.ragCount": { $gte: "$limits.ragLimit" } }
                ]
            },
            {
                $set: {
                    "usage.promptCount": 0,
                    "usage.ragCount": 0,
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

