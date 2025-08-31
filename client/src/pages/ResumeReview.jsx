import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import api from "../services/api"
import { FaFile } from "react-icons/fa"
import { ResumeScore } from "./ResumeScore"

export const ResumeReview = () => {
    const [resumeText, setResumeText] = useState("")
    const [review, setReview] = useState("")
    const [loading, setLoading] = useState(false)
    const [scores, setScores] = useState(null)

    const handleReview = async () => {
        if (!resumeText.trim()) return

        setLoading(true)
        setReview("")
        setScores(null)

        try {
            const { data } = await api.post("/resume/review", { resumeText })

            if(data){
                setReview(data.review)
                setScores(data.scorecard)
            } else {
                setReview("Something went wrong.")
            }
        } catch (err) {
            setReview("Error fetching review.")
        } finally {
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
                <p className="text-white">
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

                    {/* Scorecard */}
                    {scores && (
                        <div className="animate-fadeIn">
                            <ResumeScore scores={scores} />
                        </div>
                    )}

                    {review && (
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
