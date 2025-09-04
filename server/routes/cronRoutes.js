import express from "express"
import { verifyCronSecret } from "../middlewares/cron.js"
import { resetLimits } from "../controllers/cron.js"

const router = express.Router()

router.post("/reset-limits", verifyCronSecret, resetLimits)

export default router
