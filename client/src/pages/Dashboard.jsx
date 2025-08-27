// src/pages/Dashboard.jsx
import { useEffect, useState } from "react"
import api from "../services/api.js"
import { FaChartPie, FaHistory } from "react-icons/fa"

export const Dashboard = () => {
    const [usage, setUsage] = useState(null)
    const [history, setHistory] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const usageRes = await api.get("/auth/usage")
            setUsage(usageRes.data)
            
            const promptRes = await api.get("/prompts/history")
            setHistory(promptRes.data)
        } catch (err) {
            console.error("Failed to fetch dashboard data", err)
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
                    <p className="text-gray-700 dark:text-gray-300">
                        {usage.promptsUsed} / {usage.maxLimit} prompts used
                    </p>
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-800 dark:text-gray-100">
                    <FaHistory /> Prompt History
                </h2>
                {history.length === 0 ? (
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
