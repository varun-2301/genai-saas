import { useLocation } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"

export const Layout = ({ children }) => {
    const location = useLocation()
    const isLoginPage = location.pathname === "/"

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-950 dark:to-gray-900">
            {/* Sidebar only if not login page */}
            {!isLoginPage && <Sidebar />}

            <div className="flex-1 flex flex-col">
                {/* Navbar (hide dropdown in login) */}
                <Navbar hideUserDropdown={isLoginPage} />

                <main className="flex-1 flex items-start justify-center px-4 py-6">
                    <div className="w-full max-w-5xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

