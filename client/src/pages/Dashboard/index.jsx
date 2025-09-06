import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

import api from "../../services/api"
import { Usage } from "./Usage"
import { UsageAlert } from "./UsageAlert"
import { PromptHistory } from "./PromptHistory"
import { useAuth } from "@/context/AuthContext"

export const Dashboard = () => {
    const [usage, setUsage] = useState(null)
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        fetchUsageData()
        fetchHistoryData()
    }, [])

    const fetchUsageData = async () => {
        try {
            const tags = ['prompt', 'rag', 'image']
            const { data: usageRes } = await api.get("/user/usage", {params : {type : tags}})
            setUsage(usageRes)

        } catch (err) {
            const msg = err?.response?.data || err.message || "Failed to fetch dashboard data"
            console.error(msg)
        } finally {
            setLoading(false)
        }
    }

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
                <Usage usage={usage} loading={loading} />
            )}

            {/* Prompt History Section */}
            <PromptHistory loading={loading} history={history} user={user} />
        </div>
    )
}
