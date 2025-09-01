// src/pages/Dashboard.jsx
import { useEffect, useState } from "react"
import api from "../services/api.js"
import { FaChartPie, FaHistory } from "react-icons/fa"
import toast from "react-hot-toast"
import { Skeleton } from "@/components/ui/skeleton"

export const Dashboard = () => {
    const [usage, setUsage] = useState(null)
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const {data : usageRes} = await api.get("/auth/usage")
            setUsage(usageRes.data)
            
            const { data : promptRes} = await api.get("/prompts/history")
            setHistory(promptRes.data)
        } catch (err) {
            const msg = err?.response?.data?.data || err.message || "Failed to fetch dashboard data"
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Your Dashboard
            </h1>

            {usage && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2 mb-2 text-gray-800 dark:text-gray-100">
                        <FaChartPie /> Usage
                    </h2>
                    {loading ? (
                        <Skeleton className="h-5 w-48" />
                    ) : (
                        <p className="text-gray-700 dark:text-gray-300">
                            {usage?.promptsUsed} / {usage?.maxLimit} prompts used
                        </p>
                    )}
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-800 dark:text-gray-100">
                    <FaHistory /> Prompt History
                </h2>

                {loading ? (
                    <ul className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <li key={i} className="space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </li>
                        ))}
                    </ul>
                ) : history.length === 0 ? (
                    <p className="text-gray-500">No prompts yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {history.map((item) => (
                            <li key={item._id} className="border-b pb-2 text-gray-700 dark:text-gray-300">
                                <strong>Prompt:</strong> {item.prompt}
                                <br />
                                <strong>Response:</strong> {item.response}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
