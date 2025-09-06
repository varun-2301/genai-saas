import { useEffect } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { useUsage } from "../hooks/useUsage"

export const UsageText = ({ type = "prompt", refetchKey }) => {
    const { usage, usageLoading, fetchUsage } = useUsage([type])

    const used = usage?.[`${type}Used`] || 0
    const max = usage?.[`${type}MaxLimit`] || 0

    // refetch when key changes
    useEffect(() => {
        if (refetchKey) fetchUsage()
    }, [refetchKey])

    return (
        <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            {usageLoading ? (
                <Skeleton className="h-4 w-40" />
            ) : (
                `${used} / ${max} ${type} used`
            )}
        </div>
    )
}
