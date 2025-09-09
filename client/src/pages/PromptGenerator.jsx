import { useState } from "react"
import api from "../services/api.js"
import { FaRocket } from "react-icons/fa"
import { Skeleton } from "@/components/ui/skeleton"
import toast from "react-hot-toast"

import { UsageText } from "@/components/UsageText"

export const PromptGenerator = () => {
    const [prompt, setPrompt] = useState("")
    const [result, setResult] = useState("")
    const [loading, setLoading] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)

    const handleGenerate = async () => {
        if (!prompt.trim()){
            toast.error('Please provide some prompt')
            return
        }
        
        setLoading(true)
        const t = toast.loading("Waiting for response...")
        try {
            const res = await api.post("/prompts/generate", { prompt })
            if(res?.success){
                setResult(res.data.result)
                setPrompt('')
                setRefreshKey(prev => prev + 1)
            }
        } catch (err) {
            const msg = err?.response?.data || err.message || "Error fetching Question Answer"
            console.error(msg)
        } finally {
            toast.dismiss(t)
            setLoading(false)
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <FaRocket /> SaaS Prompt Generator
            </h2>

            <textarea
                name="prompt"
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 border rounded mb-4 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your SaaS prompt (e.g., write a landing page headline)..."
            />

            <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
            >
                {loading ? "Generating..." : "Generate"}
            </button>

            <div className="mt-6">
                {loading && result === '' ? (
                        <div className="space-y-2 mt-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                ) : (
                    <>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Response:</h4>
                        <p className="whitespace-pre-line mt-2 bg-gray-100 dark:bg-gray-700 p-3 rounded text-gray-800 dark:text-gray-200">
                            {result}
                        </p>
                    </>
                )}
            </div>

            <UsageText type="prompt" refetchKey={refreshKey} />
        </div>
    )
}

