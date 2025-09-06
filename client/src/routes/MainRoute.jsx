import { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute"
import { Spinner } from "@/components/Spinner"
import { Layout } from "@/components/Layout"

// Lazy-loaded pages
const Login = lazy(() => import('../pages').then((module) => ({ default: module.Login })))
const Dashboard = lazy(() => import('../pages').then((module) => ({ default: module.Dashboard })))
const PromptGenerator = lazy(() => import('../pages').then((module) => ({ default: module.PromptGenerator })))
const ResumeReview = lazy(() => import('../pages').then((module) => ({ default: module.ResumeReview })))
const RagUpload = lazy(() => import('../pages').then((module) => ({ default: module.RagUpload })))
const Profile = lazy(() => import('../pages').then((module) => ({ default: module.Profile })))
const Pricing = lazy(() => import('../pages').then((module) => ({ default: module.Pricing })))
const ImageGeneration = lazy(() => import('../pages').then((module) => ({ default: module.ImageGeneration})))

export const MainRoute =() => {
    const routes = [
        { path: '/', component: Login, isProtected: false },
        { path: '/dashboard', component: Dashboard, isProtected: true },
        { path: '/prompt-generate', component: PromptGenerator, isProtected: true },
        { path: '/resume-review', component: ResumeReview, isProtected: true },
        { path: '/rag', component: RagUpload, isProtected: true },
        { path: '/profile', component: Profile, isProtected: true },
        { path: '/pricing', component: Pricing, isProtected: true },
        { path: '/image', component: ImageGeneration, isProtected: true },
    ]

    return (
        <Suspense fallback={<Spinner />}>
            <Layout>
                <Routes>
                    {routes.map((route, i) => {
                        const Component = route.component; // assign to a capitalized variable
                        return (
                            <Route
                                key={i}
                                path={route.path}
                                element={
                                    route.isProtected
                                    ? <ProtectedRoute><Component /></ProtectedRoute>
                                    : <Component />
                                }
                            />
                        )
                    })}
                </Routes>
            </Layout>
        </Suspense>
    )
}

