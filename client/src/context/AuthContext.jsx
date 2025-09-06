import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../utils/firebase.js"
import { auth as authUser } from "../utils/firebase.js"
import api from "../services/api.js"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    // Fetch user info
    const fetchUser = async () => {
        try {
            const res = await api.get("/user/me")
            if (res?.success)
                setUser(res.data.user)
        } catch (err) {
            console.error('auth',err)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!loading && user) {
            navigate("/dashboard")
        }
    }, [user, loading, navigate])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                fetchUser()
            } else {
                setUser(null)
                setLoading(false)
            }
        })
        return () => unsubscribe()
    }, [])

    const logout = async() => {
        setUser(null)
        localStorage.removeItem("theme")
        await signOut(authUser)
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ user, logout, refreshUser: fetchUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
