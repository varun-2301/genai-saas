import { FaChartPie } from "react-icons/fa"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export const Usage = ({ usage, loading }) => {
    const {
        promptUsed = 0,
        promptMaxLimit = 0,
        ragUsed = 0,
        ragMaxLimit = 0,
        imageUsed = 0,
        imageMaxLimit = 0
    } = usage || {}

    const getProgressColor = (percent) => {
        if (percent < 50) return "bg-green-500"
        if (percent < 80) return "bg-yellow-500"
        return "bg-red-500"
    }

    const renderBar = (label, used, max) => {
        const percent = max > 0 ? (used / max) * 100 : 0
        return (
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-800 dark:text-gray-200 font-medium">
                    <span>{label}</span>
                    <span>{used}/{max}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                    <div
                        className={`${getProgressColor(percent)} h-4 rounded-full transition-all`}
                        style={{ width: `${percent}%` }}
                    ></div>
                </div>
            </div>
        )
    }

    return (
        <Card className="bg-white dark:bg-gray-800 shadow p-6 rounded-2xl space-y-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
                <FaChartPie /> Usage Overview
            </h2>
            {loading ? (
                <div className="space-y-4">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-5 w-48" />
                </div>
            ) : (
                <div className="space-y-6">
                    {renderBar("Prompt Usage", promptUsed, promptMaxLimit)}
                    {renderBar("RAG Usage", ragUsed, ragMaxLimit)}
                    {renderBar("Image Usage", imageUsed, imageMaxLimit)}
                </div>
            )}
        </Card>
    )
}
