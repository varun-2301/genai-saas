import { useState } from "react"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"
import { FaFile } from "react-icons/fa"

import { ResumeScore } from "./ResumeScore"
import api from "@/services/api"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { isFreeUser } from "@/utils/helper"
import { useAuth } from "@/context"

export const ResumeReview = () => {
    const [resumeText, setResumeText] = useState("")
    const [review, setReview] = useState("")
    const [loading, setLoading] = useState(false)
    const [scores, setScores] = useState(null)
    const { user } = useAuth()

    const handleReview = async () => {
        if (!resumeText.trim()){
            toast.error('Please provide some resume content to analyze')
            return
        }

        setLoading(true)
        setReview("")
        setScores(null)

        const t = toast.loading("Analyzing text and waiting for response...")
        try {
            const result = await api.post("/resume/review", { resumeText })

            if(result?.success){
                setReview(result.data.review)
                setScores(result.data.scorecard)
                setResumeText('')
            }
        } catch (err) {
            const msg = err?.response?.data || err.message || "Error fetching review"
            console.error(msg)
        } finally {
            toast.dismiss(t)
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-4 px-4">
            {/* Page Header */}
            <div className="text-center mb-10">
                <div className="flex items-center justify-center mb-3">
                    <FaFile className="h-8 w-8 text-primary mr-2" />
                    <h1 className="text-3xl font-bold">AI Resume Reviewer</h1>
                </div>
                <p className="text-white:600">
                    Paste your resume text and get instant AI-powered feedback.
                </p>
            </div>

            {/* Card */}
            <Card className="shadow-lg rounded-2xl border border-border/40">
                <CardContent className="p-6 space-y-6">
                    <Textarea
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        placeholder="Paste your resume text here..."
                        className="min-h-[220px] resize-none"
                    />

                    <div className="flex justify-center">
                        <Button
                            onClick={handleReview}
                            disabled={loading}
                            className="w-full sm:w-auto px-6"
                        >
                        {loading ? (
                            <>
                            <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                Analyzing...
                            </>
                        ) : (
                            "Get AI Review"
                        )}
                        </Button>
                    </div>
                    
                    {/* Scorecard with Skeleton */}
                    {loading && (
                        <div className="space-y-4 mt-4">
                            <Skeleton className="h-24 w-full rounded-xl" />
                            <Skeleton className="h-6 w-2/3" />
                            <Skeleton className="h-6 w-1/2" />
                        </div>
                    )}

                    {/* Scorecard */}
                    {scores && !loading && !isFreeUser(user) && (
                        <div className="animate-fadeIn">
                            <ResumeScore scores={scores} />
                        </div>
                    )}

                    {review && !loading && (
                        <div className="bg-muted p-5 rounded-xl border border-border/40 animate-fadeIn">
                            <h3 className="text-lg font-semibold mb-3">AI Feedback</h3>
                            <p className="whitespace-pre-wrap leading-relaxed">{review}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
