import fs from "fs"
import pdfParse from 'pdf-extraction'
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai"
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase"
import { createClient } from "@supabase/supabase-js"
import { handleSuccessResponse } from "../utils/responseHelper.js"

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

export const docUpload = async(req, res, next) => {
    try {
        // read the uploaded file
        const dataBuffer = fs.readFileSync(req.file.path)

        const pdf = await pdfParse(dataBuffer)
        const text = pdf.text
        
        // Split text into chunks
        const chunks = text.match(/[\s\S]{1,1000}/g)

        // Generate embeddings & store in Supabase
        const embeddings = new OpenAIEmbeddings({ apiKey: process.env.OPENAI_API_KEY })
        await SupabaseVectorStore.fromTexts(
                chunks,
                chunks.map(() => ({})), // metadata
                embeddings,
                { client: supabase, tableName: "documents" }
        )

        // ✅ Delete the uploaded file to keep uploads/ clean
        await fs.promises.unlink(req.file.path)

        return handleSuccessResponse(res, { message: "PDF uploaded and indexed successfully!" })
    } catch (err) {
        console.error(err)
        // still try to cleanup if file exists
        if (req.file && fs.existsSync(req.file.path)) {
            await fs.promises.unlink(req.file.path)
        }

        next(err)
    }
}

export const ask = async (req, res) => {
    try {
        const { question } = req.body

        // 1. Generate embedding
        const embeddings = new OpenAIEmbeddings({ apiKey: process.env.OPENAI_API_KEY })

        // 2. Connect to Supabase vector store
        const vectorStore = await SupabaseVectorStore.fromExistingIndex(embeddings, {
            client: supabase,
            tableName: "documents",
            queryName: "match_documents",
        })

        // 3. Perform similarity search
        const results = await vectorStore.similaritySearch(question, 3)

        // 4. Build context
        const context = results.map((r) => r.pageContent).join("\n\n")

        // 5. Call ChatOpenAI properly
        const model = new ChatOpenAI({ apiKey: process.env.OPENAI_API_KEY })
        const response = await model.invoke([
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `Context: ${context}\n\nQuestion: ${question}` }
        ])

        return handleSuccessResponse(res, {answer :  response.content})
    } catch (err) {
        console.error(err)
        next(err)
    }
}
