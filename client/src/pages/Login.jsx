import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

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
    }

    if (user) {
        navigate("/dashboard");
        return null;
    }

    return (
        // <div className="min-h-screen flex items-center justify-center">
        //     <button onClick={handleLogin} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
        //         Sign in with Google
        //     </button>
        // </div>
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

