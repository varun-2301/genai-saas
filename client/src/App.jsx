// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import {Dashboard} from "./pages/Dashboard";
import {Login} from "./pages/Login";
import {Profile} from "./pages/Profile";
import {Pricing} from "./pages/Pricing";
import ProtectedRoute from "./routes/ProtectedRoute";
import Generate from "./pages/Generate";

export const App =() => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/generate"
                        element={
                            <ProtectedRoute>
                                <Generate />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

