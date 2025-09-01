import { useEffect, useState, useRef } from "react"
import toast from "react-hot-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import api from "../services/api"

export const RagUpload = () => {
    const [file, setFile] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [showQA, setShowQA] = useState(false)
    
    const [question, setQuestion] = useState("")
    const [answers, setAnswers] = useState([])
    const [isAsking, setIsAsking] = useState(false)

    const chatEndRef = useRef(null)

    // Auto scroll to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [answers, isAsking])

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a PDF file first")
            return
        }

        if (file.type !== "application/pdf") {
            toast.error("Only PDF files are allowed")
            return
        }

        setIsUploading(true)
        setShowQA(false)

        const t = toast.loading("Uploading & indexing PDF...")
        try {
            const formData = new FormData()
            formData.append("file", file)

            // axios automatically sets headers for FormData
            const { data: res} = await api.post(`/rag/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            if (res.success) {
                toast.success(res?.data?.message)
                setShowQA(true)
                setFile(null)
            } else {
                toast.error(res.error?.data || "Upload failed.");
            }
        } catch (err) {
            console.error(err)
            const msg = err?.response?.data?.error || err.message || "Upload failed";
            toast.error(msg)
        } finally {
            toast.dismiss(t)
            setIsUploading(false)
        }
    }

    const handleAsk = async () => {
        if (!question){
            toast.error("Please enter a question")
            return
        }

        setIsAsking(true)
        
        const t = toast.loading("Waiting for response...")
        try{
            setAnswers((prev) => [...prev, { role: "user", content: question }])
    
            const { data:res } = await api.post("/rag/ask", {question})

            if(res.success){
                setAnswers((prev) => [...prev, { role: "assistant", content: res.data.answer }])
                setQuestion("")
            } else {
                toast.error(`${res.data.data || "No answer received from server"}`)
            }
        } catch (err) {
            console.error(err)
            const msg = err?.response?.data?.data || err.message || "Error fetching Question Answer"
            toast.error(msg)
        } finally {
            toast.dismiss(t)
            setIsAsking(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold text-center">Ask Q/A with PDFs</h1>

            {/* Upload Section */}
            <div className="flex justify-center items-center bg-muted/30 mb-6 ">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Upload your PDF</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input type="file" accept="application/pdf" onChange={handleFileChange} />
                        <Button
                            onClick={handleUpload}
                            disabled={isUploading}
                            className="w-full"
                        >
                            {isUploading ? "Uploading..." : "Upload"}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Q/A Section - only visible after upload */}
            {showQA && (
                <Card className="w-full shadow-lg bg-white">
                    <CardContent className="space-y-4">
                        <h2 className="text-lg font-semibold">Chat with your PDF</h2>

                        {/* Chat Messages */}
                        <div className="h-72 overflow-y-auto border rounded-lg p-3 bg-gray-50 flex flex-col gap-2">
                            {answers.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <span
                                        className={`inline-block px-3 py-2 rounded-lg max-w-xs break-words ${
                                        msg.role === "user"
                                            ? "bg-purple-600 text-white"
                                            : "bg-gray-200 text-gray-800"
                                        }`}
                                    >
                                        {msg.content}
                                    </span>
                                </div>
                            ))}

                            {/* Skeleton Loader for Assistant */}
                            {isAsking && (
                                <div className="flex justify-start">
                                    <div className="inline-block px-3 py-2 rounded-lg max-w-xs bg-gray-200">
                                        <div className="space-y-2 animate-pulse">
                                            <div className="h-3 w-24 bg-gray-300 rounded"></div>
                                            <div className="h-3 w-32 bg-gray-300 rounded"></div>
                                            <div className="h-3 w-20 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Box */}
                        <div className="flex gap-2 mt-2">
                            <Input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Ask a question..."
                                className="flex-1"
                            />
                            <Button
                                onClick={handleAsk}
                                disabled={isAsking}
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                {isAsking ? "Asking..." : "Ask"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
