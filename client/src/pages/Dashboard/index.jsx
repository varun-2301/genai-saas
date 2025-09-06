import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

import api from "../../services/api"
import { Usage } from "./Usage"
import { UsageAlert } from "./UsageAlert"
import { PromptHistory } from "./PromptHistory"
import { useAuth } from "@/context/AuthContext"
import { useUsage } from "@/hooks/useUsage"

export const Dashboard = () => {
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const { usage, usageLoading } = useUsage(['prompt', 'image', 'rag'])

    const navigate = useNavigate()

    useEffect(() => {
        fetchHistoryData()
    }, [])

    const fetchHistoryData = async () => {
        try {
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
            {usage && (
                (usage.promptUsed >= usage.promptMaxLimit ||
                 usage.ragUsed >= usage.ragMaxLimit ||
                 usage.imageUsed >= usage.imageMaxLimit) && (
                    <UsageAlert
                        handleClick={() => navigate('/pricing')}
                        message="You have exhausted one or more of your features limits"
                    />
                )
            )}

            {/* Usage Section */}
            {usage && (
                <Usage usage={usage} loading={usageLoading} />
            )}

            {/* Prompt History Section */}
            <PromptHistory loading={loading} history={history} user={user} />
        </div>
    )
}
