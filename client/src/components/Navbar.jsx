// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { FaUser, FaRocket, FaSignOutAlt, FaChartPie, FaTags } from "react-icons/fa";

export const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 h-16 flex items-center shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">GenAI SaaS</Link>
        <div className="flex items-center gap-6">
          {user && (
            <>
              <Link to="/dashboard" className="flex items-center gap-1 hover:text-blue-400">
                <FaChartPie /> Dashboard
              </Link>
              <Link to="/generate" className="flex items-center gap-1 hover:text-blue-400">
                <FaRocket /> Generate
              </Link>
              <Link to="/profile" className="flex items-center gap-1 hover:text-blue-400">
                <FaUser /> Profile
              </Link>
              <Link to="/pricing" className="flex items-center gap-1 hover:text-blue-400">
                <FaTags /> Pricing
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1 hover:text-red-400"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
