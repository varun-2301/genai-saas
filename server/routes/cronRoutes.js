import express from "express"
import { verifyCronSecret } from "../middlewares/cron"
import { resetLimits } from "../controllers/cron"

const router = express.Router()

router.post("/reset-limits", verifyCronSecret, resetLimits)

export default router
