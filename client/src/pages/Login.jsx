// src/pages/Login.jsx
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../utils/firebase.js"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"
import api from "../services/api.js"
import { FcGoogle } from "react-icons/fc"

export const Login = () => {
    const navigate = useNavigate()
    const { user } = useAuth()

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            const firebaseUser = result.user
            const idToken = await firebaseUser.getIdToken()
            await api.post("/auth/save-user", { idToken, user: firebaseUser })
        } catch (err) {
            console.error("Login failed:", err)
        }
    }

    if (user) {
        navigate("/dashboard")
        return null
    }

    return (
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
            <div className="p-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center w-[22rem]">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Welcome Back 🚀
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Sign in to continue
                </p>
                
                <button
                    onClick={handleLogin}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full justify-center shadow"
                >
                    <FcGoogle className="text-2xl" />
                    Continue with Google
                </button>
            </div>
        </div>
    )
}
