import { useState } from "react"
import toast from "react-hot-toast"

import api from "@/services/api"
import { Skeleton } from "@/components/ui/skeleton"
import { UsageText } from "@/components/UsageText"

export const ImageGeneration = () => {
    const [prompt, setPrompt] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)

    const handleGenerate = async () => {
        if (!prompt.trim()){
            toast.error('Please provide some prompt for image generation')
            return
        }

        setLoading(true)
        const t = toast.loading("Waiting for response...")
        try{
            const res = await api.post("/images", { prompt })

            if(res?.success){
                setImageUrl(res.data.imageUrl)
                setRefreshKey(prev => prev + 1)
            }
        } catch(err){
            console.error("Image fetch failed:", err.response?.data || err.message)
        } finally {
            toast.dismiss(t)
            setLoading(false)
            setPrompt('')
        }
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">🎨 AI Image Generator</h2>
            <input
                type="text"
                placeholder="Describe your image..."
                className="border p-2 w-full rounded mb-3"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button
                onClick={handleGenerate}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? 'Generating...' : 'Generate'}
            </button>

            <div className="mt-6">
                {loading 
                    ? 
                        <Skeleton className="w-full h-64 rounded-lg" />
                    : 
                        imageUrl && (
                            <div className="mt-4">
                                <img src={imageUrl} alt="Generated" className="rounded-lg shadow-md" />
                            </div>
                        )
                }
            </div>

            <UsageText type="image" refetchKey={refreshKey} />
        </div>
    )
}