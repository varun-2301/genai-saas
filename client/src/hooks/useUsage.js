import { useState, useEffect, useCallback } from "react"
import api from "../services/api"

export function useUsage(type = ["prompt"]) {
    const [usage, setUsage] = useState(null)
    const [usageLoading, setUsageLoading] = useState(true)

    const fetchUsage = useCallback(async () => {
        try {
            const res = await api.get("/user/usage", { params: { type } })
            setUsage(res.data)
        } catch (err) {
            console.error("Usage fetch failed:", err.response?.data || err.message)
        } finally {
            setUsageLoading(false)
        }
    }, [type.join(",")])

    useEffect(() => {
        fetchUsage()
    }, [fetchUsage])

    return { usage, usageLoading, fetchUsage }
}
