import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import api from "../services/api"

export const RagUpload = () => {
    const [file, setFile] = useState(null)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [showQA, setShowQA] = useState(false)
    
    const [question, setQuestion] = useState("")
    const [answers, setAnswers] = useState([])
    const [qaError, setQAError] = useState('')
    const [isAsking, setIsAsking] = useState(false)

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file first.")
            return
        }

        setIsUploading(true)
        setMessage("")
        setError("")
        setShowQA(false)

        try {
            const formData = new FormData()
            formData.append("file", file)

            // axios automatically sets headers for FormData
            const res = await api.post(`/rag/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            if (res.status === 200) {
                setMessage("✅ PDF uploaded successfully!")
                setShowQA(true)
                setFile('')
            } else {
                setError(`❌ Error: ${res.error || "Something went wrong"}`)
            }
        } catch (err) {
            console.error(err)
            setError("❌ Error uploading file")
        } finally {
            setIsUploading(false)
        }
    }

    const handleAsk = async () => {
        if (!question) return

        setIsAsking(true)
        setQAError('')

        try{
            setAnswers((prev) => [...prev, { role: "user", content: question }])
    
            const res = await api.post("/rag/ask", {question})

            if(res.status === 200){
                setAnswers((prev) => [...prev, { role: "assistant", content: res.data.answer }])
                setQuestion("")
            } else {
                setQAError(`❌ Error: ${res.error || "Something went wrong"}`)
            }
        } catch (err) {
            console.error(err)
            setQAError("❌ Error fetching Question Answer")
        } finally {
            setIsAsking(false)
        }
    }

    // return (
    //     <div className="flex justify-center items-center bg-muted/30 ">
    //         <Card className="w-full max-w-md shadow-lg">
    //             <CardHeader>
    //                 <CardTitle className="text-xl font-semibold">Upload your PDF</CardTitle>
    //             </CardHeader>
    //             <CardContent className="space-y-4">
    //                 <Input type="file" accept="application/pdf" onChange={handleFileChange} />
    //                 <Button
    //                     onClick={handleUpload}
    //                     disabled={loading}
    //                     className="w-full"
    //                 >
    //                     {loading ? "Uploading..." : "Upload"}
    //                 </Button>

    //                 {message && <p className="text-sm text-center">{message}</p>}
    //                 {error && <p className="text-sm text-center text-red-500">{error}</p>}
                
    //             </CardContent>
    //         </Card>
    //     </div>
    // )

    // return (
    //     <div className="space-y-6">
    //         <Card className="p-4">
    //             <CardContent className="space-y-4">
    //                 <Input type="file" accept="application/pdf" onChange={handleFileChange} />

    //                 <Button
    //                     onClick={handleUpload}
    //                     disabled={isUploading}
    //                     className="w-full"
    //                 >
    //                     {isUploading ? "Uploading..." : "Upload"}
    //                 </Button>

    //                  {message && <p className="text-sm text-center">{message}</p>}
    //                  {error && <p className="text-sm text-center text-red-500">{error}</p>}
                
    //              </CardContent>
    //         </Card>

    //         <div className="space-y-4">
    //             <div className="max-h-96 overflow-y-auto border rounded-lg p-4 bg-muted">
    //                 {answers.map((msg, idx) => (
    //                     <div
    //                         key={idx}
    //                         className={`mb-3 ${
    //                             msg.role === "user" ? "text-right" : "text-left"
    //                         }`}
    //                     >
    //                         <span
    //                             className={`inline-block px-3 py-2 rounded-lg ${
    //                             msg.role === "user"
    //                                 ? "bg-purple-600 text-white"
    //                                 : "bg-gray-200 text-gray-900"
    //                             }`}
    //                         >
    //                             {msg.content}
    //                         </span>
    //                     </div>
    //                 ))}
    //             </div>

    //             <div className="flex gap-2">
    //                 <Input
    //                     placeholder="Ask a question..."
    //                     value={question}
    //                     onChange={(e) => setQuestion(e.target.value)}
    //                 />
    //                 <Button onClick={handleAsk}>Ask</Button>
    //             </div>
    //         </div>
    //     </div>
    // )

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Ask Q/A with PDFs</h1>

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

                        {message && <p className="text-sm text-center">{message}</p>}
                        {error && <p className="text-sm text-center text-red-500">{error}</p>}
                    
                    </CardContent>
                </Card>
            </div>

            {/* Q/A Section - only visible after upload */}
            {showQA && (
                <div className="border rounded-lg p-6 shadow bg-white">
                    <h2 className="text-lg font-semibold mb-3">Chat with your PDF</h2>

                    {/* Chat Messages */}
                    <div className="h-64 overflow-y-auto border rounded-lg p-3 mb-4 bg-gray-50">
                        {answers.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`mb-2 ${
                                    msg.role === "user" ? "text-right" : "text-left"
                                }`}
                            >
                                <span
                                    className={`inline-block px-3 py-2 rounded-lg ${
                                        msg.role === "user"
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-200 text-gray-800"
                                    }`}
                                >
                                    {msg.content}
                                </span>
                            </div>
                        ))}

                        {qaError && <p className="text-sm text-center text-red-500">{qaError}</p>}
                    </div>

                    {/* Input Box */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Ask a question..."
                            className="flex-1 border px-3 py-2 rounded-lg"
                        />
                        <button
                            onClick={handleAsk}
                            disabled={isAsking}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                        >
                            {isAsking ? "Asking..." : "Ask"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
