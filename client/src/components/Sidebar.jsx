import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Menu, X, Home, FileText, CreditCard, Rocket, FileUp } from "lucide-react"

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const linkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
            isActive
                ? "bg-indigo-600 text-white" // active
                : "text-gray-300 hover:bg-gray-800 hover:text-white" // inactive
        }`
    
    // closes sidebar only on mobile
    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setIsOpen(false)
        }
    }

    return (
        <>
            {/* Mobile Hamburger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow"
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed md:static inset-y-0 left-0 w-64 bg-gray-900 text-gray-200 shadow-lg transform 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                md:translate-x-0 transition-transform duration-200 ease-in-out z-40`}
            >
                <div className="p-6 border-b border-gray-700">
                    <h2 className="text-xl font-bold">GenAI SaaS</h2>
                </div>

                <nav className="mt-4 space-y-2">
                    <NavLink to="/dashboard" className={linkClasses} onClick={handleLinkClick}>
                        <Home size={18} /> Dashboard
                    </NavLink>

                    <NavLink to="/prompt-generate" className={linkClasses} onClick={handleLinkClick}>
                        <Rocket size={18} /> Prompt Generate
                    </NavLink>

                    <NavLink to="/resume-reviewer" className={linkClasses} onClick={handleLinkClick}>
                        <FileText size={18} /> Resume Reviewer
                    </NavLink>

                    <NavLink to="/pricing" className={linkClasses} onClick={handleLinkClick}>
                        <CreditCard size={18} /> Pricing
                    </NavLink>

                    <NavLink to="/rag" className={linkClasses} onClick={handleLinkClick}>
                        <FileUp size={18} /> RAG Q&A
                    </NavLink>
                </nav>
            </aside>
        </>
    )
}
