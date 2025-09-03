import express from "express"
import multer from "multer"
import path from "path"
import fs from 'fs'
import { ask, docUpload } from "../controllers/rag.js"
import { checkUsageLimit } from "../middlewares/usageLimit.js"
import { verifyToken } from "../middlewares/auth.js"

const router = express.Router()
// ✅ Ensure uploads dir exists at runtime
const uploadDir = path.join(process.cwd(), "uploads")
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const upload = multer({ dest: "uploads/" })

router.post("/upload", upload.single("file"), verifyToken, checkUsageLimit('rag'), docUpload)
router.post("/ask", verifyToken, ask)

export default router
