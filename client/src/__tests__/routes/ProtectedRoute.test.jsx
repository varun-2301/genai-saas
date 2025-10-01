import React from "react"
import { describe, it } from "vitest"
import { screen } from "@testing-library/react"
import { Routes, Route } from "react-router-dom"
import { ProtectedRoute } from "../../routes/ProtectedRoute"
import { renderWithProviders } from "../utils/test-utils"

describe("ProtectedRoute", () => {
    it("renders spinner when loading", () => {
        renderWithProviders(
            <Routes>
                <Route path="/dashboard" element={<ProtectedRoute><div>Private</div></ProtectedRoute>} />
            </Routes>,
            { route: "/dashboard", auth: { loading: true } }
        )
        // Spinner exists
        expect(document.querySelector(".animate-spin")).toBeInTheDocument()
    })

    it("redirects when not authenticated", () => {
        renderWithProviders(
            <Routes>
                <Route path="/" element={<div>Login</div>} />
                <Route path="/dashboard" element={<ProtectedRoute><div>Private</div></ProtectedRoute>} />
            </Routes>,
            { route: "/dashboard", auth: { user: null, loading: false } }
        )
        expect(screen.getByText(/Login/i)).toBeInTheDocument()
    })

    it("renders children when authenticated", () => {
        renderWithProviders(
            <Routes>
                <Route path="/dashboard" element={<ProtectedRoute><div>Private</div></ProtectedRoute>} />
            </Routes>,
            { route: "/dashboard", auth: { user: { name: "Jane" }, loading: false } }
        )
        expect(screen.getByText(/Private/)).toBeInTheDocument()
    })
})



