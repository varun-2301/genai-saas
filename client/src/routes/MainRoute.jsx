import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import { Dashboard, Login, Profile, Pricing, ResumeReviewer, PromptGenerator, RagUpload } from '../pages'

export const MainRoute =() => {
    const routes = [
        { path : '/', component: <Login />, isProtected: false },
        { path : '/dashboard', component: <Dashboard />, isProtected: true },
        { path : '/prompt-generate', component: <PromptGenerator />, isProtected: true },
        { path : '/resume-reviewer', component: <ResumeReviewer />, isProtected: true },
        { path : '/rag', component: <RagUpload />, isProtected: true },
        { path : '/profile', component: <Profile />, isProtected: true },
        { path : '/pricing', component: <Pricing />, isProtected: true },
    ]

    return (
        <Routes>
            {routes.map((route, i) => (
                <Route
                    key={i}
                    path={route.path}
                    element={
                        route.isProtected
                            ? <ProtectedRoute>{route.component}</ProtectedRoute>
                            : route.component
                    }
                />
            ))}
        </Routes>
    )
}

