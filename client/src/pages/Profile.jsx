// src/pages/Profile.jsx
import { useAuth } from "../context/AuthContext";

export const Profile = () => {
    const { user } = useAuth()

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Profile</h1>
            {user && (
                <div className="mt-4 space-y-2">
                <p><strong>Name:</strong> {user.displayName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <img src={user.photoURL} alt="avatar" className="w-20 rounded-full" />
                </div>
            )}
        </div>
    )
}

