import { FaChartPie } from "react-icons/fa"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export const PromptUsage = ({usage, loading}) => {
    const { promptsUsed, maxLimit } = usage || {}

    return (
        <Card className="bg-white dark:bg-gray-800 shadow p-6 rounded-lg">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-800 dark:text-gray-100">
                <FaChartPie /> Usage
            </h2>
            {loading ? (
                <Skeleton className="h-5 w-48" />
            ) : (
                <div className="space-y-3">
                    <Progress
                        value={(promptsUsed / maxLimit) * 100}
                        className="h-4"
                    />
                    <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                        <span>{promptsUsed} used</span>
                        <span>{maxLimit - promptsUsed} remaining</span>
                    </div>
                </div>
            )}
        </Card>
    )
}