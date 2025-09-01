// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../utils/firebase.js" // Adjust the import path as necessary
import { signOut } from "firebase/auth"
import { auth as authUser } from "../utils/firebase.js"
import api from "../services/api.js"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    // Theme state
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

    // Fetch user info
    const fetchUser = async () => {
        try {
            const res = await api.get("/auth/me")
            if (res.data.success)
                setUser(res.data.data.user)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                fetchUser()
            }
        })
        return unsubscribe
    }, [])

    // Handle theme changes
    useEffect(() => {
        document.documentElement.classList.remove(theme === "light" ? "dark" : "light")
        document.documentElement.classList.add(theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"))

    const logout = async() => {
        setUser(null)
        localStorage.removeItem("theme")
        await signOut(authUser)
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ user, logout, theme, toggleTheme }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
