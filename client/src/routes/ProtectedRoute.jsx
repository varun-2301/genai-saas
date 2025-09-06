// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Spinner } from "@/components/Spinner"

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) return <Spinner />
    
    if (!user) return <Navigate to="/" />
    
    return children
}

