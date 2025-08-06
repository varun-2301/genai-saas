// export const Navbar = () => {
//     return (
//         <nav className="bg-gray-800 p-4">
//             <div className="container mx-auto flex justify-between items-center">
//                 <a href="/" className="text-white text-lg font-bold">GenAI SaaS</a>
//                 <div>
//                     <a href="/dashboard" className="text-white px-4">Dashboard</a>
//                     <a href="/profile" className="text-white px-4">Profile</a>
//                     <a href="/pricing" className="text-white px-4">Pricing</a>
//                     <a href="/" className="text-white px-4">Login</a>
//                 </div>
//             </div>
//         </nav>
//     )
// }

// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase.js"; // Adjust the import path as necessary

export const Navbar = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const logout = async () => {
        await signOut(auth)
        navigate("/")
    }

    return (
        <nav className="bg-gray-800 px-6 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">GenAI SaaS</Link>
                <div className="space-x-4">
                    {user && (
                        <>
                            <Link to="/dashboard" className="text-white px-4">Dashboard</Link>
                            <Link to="/profile" className="text-white px-4">Profile</Link>
                            <Link to="/pricing" className="text-white px-4">Pricing</Link>
                            <button onClick={logout} className="text-white font-semibold">
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

