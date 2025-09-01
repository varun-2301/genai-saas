import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User, LogOut, Moon } from "lucide-react"
import { useAuth } from "../context/AuthContext";


export const Navbar = ({ hideUserDropdown }) => {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const dropdownRef = useRef(null)

    const { theme, toggleTheme, logout } = useAuth()

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <header className={`flex items-center px-6 py-4 bg-white/80 dark:bg-gray-950/80 backdrop-blur shadow relative ${!hideUserDropdown ? "justify-end" : ""}`}>
            {hideUserDropdown && (
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">GenAI SaaS</h1>
            )}
            {!hideUserDropdown && (
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                        <User />
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                            <Link
                                to="/profile"
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-300"
                            >
                                <User size={16} /> Profile
                            </Link>
                            {/* <button
                                onClick={toggleTheme}
                                className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-300"
                            >
                                <Moon size={12} /> {theme === "light" ? "Dark" : "Light"} Mode
                            </button> */}
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-300"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    )
}

