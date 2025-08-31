import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, TrendingUp } from "lucide-react";

export const ResumeScore = ({ scores }) =>{
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Resume Scorecard</h1>

            {/* ATS Score */}
            <Card>
                <CardHeader>
                    <CardTitle>ATS Compatibility</CardTitle>
                </CardHeader>
                <CardContent>
                    <Progress value={scores.atsScore} className="w-full" />
                    <p className="mt-2 text-sm text-muted-foreground">
                        Your resume scored <span className="font-bold">{scores.atsScore}%</span> in ATS checks.
                    </p>
                </CardContent>
            </Card>

            {/* Grammar */}
            {/* <Card>
                <CardHeader>
                    <CardTitle>Grammar & Readability</CardTitle>
                </CardHeader>
                <CardContent>
                    <Progress value={scores.grammarScore} className="w-full" />
                    <p className="mt-2 text-sm text-muted-foreground">
                        Grammar & readability score: <span className="font-bold">{scores.grammarScore}%</span>.
                    </p>
                </CardContent>
            </Card> */}

            {/* Skills */}
            <Card>
                <CardHeader>
                    <CardTitle>Skills Match</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div>
                        <h4 className="font-medium flex items-center gap-2 text-green-600">
                        <CheckCircle size={18} /> Matched Skills
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                        {scores?.skillsMatched?.map((skill, i) => (
                            <Badge key={i} variant="secondary">{skill}</Badge>
                        ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium flex items-center gap-2 text-red-600">
                        <XCircle size={18} /> Missing Skills
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                        {scores?.missingSkills?.map((skill, i) => (
                            <Badge key={i} variant="destructive">{skill}</Badge>
                        ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Suggestions */}
            <Card>
                <CardHeader>
                    <CardTitle>Improvement Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {scores?.improvementSuggestions?.map((s, i) => (
                        <p key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <TrendingUp size={16} className="text-blue-500" /> {s}
                        </p>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
