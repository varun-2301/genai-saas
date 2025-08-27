import { Navbar } from "./Navbar"

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-950 dark:to-gray-900">
            <Navbar />
            <main className="flex-1 flex items-start justify-center px-4">
                <div className="w-full max-w-5xl">
                    {children}
                </div>
            </main>
        </div>
    )
}
