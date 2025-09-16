import { useAuth } from "../context"
import { FaUser } from "react-icons/fa"

export const Profile = () => {
    const { user } = useAuth()

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                <FaUser /> Profile
            </h1>
            {user && (
                <div className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
                    <div className="flex justify-center">
                        <img
                            src={user.photoUrl}
                            alt="avatar"
                            className="w-24 h-24 rounded-full shadow border"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                    <p><strong>Name:</strong> {user.name || "Guest User"}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Active Plan:</strong> {user.isPro ? 'Paid' : 'Free'} Plan</p>
                </div>
            )}
        </div>
    )
}
