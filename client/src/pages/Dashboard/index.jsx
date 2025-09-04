import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import api from "../../services/api.js"

import { PromptUsage } from "./PromptUsage.jsx"
import { UsageAlert } from "./UsageAlert.jsx"
import { PromptHistory } from "./PromptHistory.jsx"

export const Dashboard = () => {
    const [usage, setUsage] = useState(null)
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const { data: usageRes } = await api.get("/user/usage")
            setUsage(usageRes)

            const { data: promptRes } = await api.get("/prompts/history")
            setHistory(promptRes)
        } catch (err) {
            const msg = err?.response?.data || err.message || "Failed to fetch dashboard data"
            console.error(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Your Dashboard
            </h1>
        
            {/* 🔴 Persistent Alert if usage exhausted */}
            {usage && usage.dataUsed >= usage.maxLimit && (
                <UsageAlert handleClick={() => navigate('/pricing')} maxLimit={usage.maxLimit} />
            )}

            {/* Usage Section */}
            {usage && (
                <PromptUsage usage={usage} loading={loading} />
            )}

            {/* Prompt History Section */}
            <PromptHistory loading={loading} history={history}  />
        </div>
    )
}
