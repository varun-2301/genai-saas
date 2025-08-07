import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase.js'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../services/api.js'

export const Login = () => {
    const navigate = useNavigate();
    const { user } = useAuth()

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
        }

        try {
            const result = await signInWithPopup(auth, provider);
            const firebaseUser = result.user;
            const idToken = await firebaseUser.getIdToken();

            // ✅ Send token to backend
            await api.post('/auth/save-user', {
                //body: JSON.stringify({ idToken }),
                idToken
            });
            // await fetch("http://localhost:5000/api/v1/auth/save-user", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     credentials: "include", // Only if you're using httpOnly cookies
            //     body: JSON.stringify({ idToken }),
            // });

            // 🔁 Now go to dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error("Login failed:", err);
        }
    }

    if (user) {
        navigate("/dashboard");
        return null;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
                Sign in with Google
            </button>
        </div>
    )
}

