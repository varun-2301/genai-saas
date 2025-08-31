import express from "express"
import multer from "multer"
import path from "path"
import fs from 'fs'
import { ask, docUpload } from "../controllers/rag.js"

const router = express.Router()
// ✅ Ensure uploads dir exists at runtime
const uploadDir = path.join(process.cwd(), "uploads")
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const upload = multer({ dest: "uploads/" })

router.post("/upload", upload.single("file"), docUpload)
router.post("/ask", ask)

export default router
