import { FaChartPie } from "react-icons/fa"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export const PromptUsage = ({usage, loading}) => {
    const { promptsUsed, maxLimit } = usage || {}

    const getProgressColor = (percent) => {
        if (percent < 50) return "bg-green-500"
        if (percent < 80) return "bg-yellow-500"
        return "bg-red-500"
    }

    return (
        <Card className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
                <FaChartPie /> Usage
            </h2>
            {loading ? (
                <Skeleton className="h-5 w-48" />
            ) : (
                <div className="space-y-3">
                    <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                        <div
                            className={`${getProgressColor(
                                (promptsUsed / maxLimit) * 100
                            )} h-4 rounded-full transition-all`}
                            style={{
                                width: `${(promptsUsed / maxLimit) * 100}%`,
                            }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                        <span>{promptsUsed} used</span>
                        <span>{maxLimit - promptsUsed} remaining</span>
                    </div>
                </div>
            )}
        </Card>
    )
}