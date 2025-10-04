import React from "react"
import { describe, it, vi, beforeEach, expect } from "vitest"
import { screen, fireEvent } from "@testing-library/react"
import { Login } from "../../pages/Login"
import { renderWithProviders } from "../utils/test-utils"

vi.mock("firebase/auth", () => ({
    signInWithPopup: vi.fn(() => Promise.resolve({ user: { getIdToken: () => Promise.resolve("token") } })),
}))

vi.mock("../../utils/firebase", () => ({
    auth: {},
    provider: {},
}))

vi.mock("../../services/api", () => ({
    default: { post: vi.fn(() => Promise.resolve({ success: true, data: {} })) }
}))

describe("Login page", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("shows spinner when loading", () => {
        renderWithProviders(<Login />, { auth: { loading: true } })
        expect(screen.getByRole("status", { hidden: true })).toBeDefined()
    })

    it("renders google button and handles click", async () => {
        const refreshUser = vi.fn()
        renderWithProviders(<Login />, { auth: { user: null, loading: false, refreshUser } })
        const btn = screen.getByRole("button", { name: /continue with google/i })
        fireEvent.click(btn)
    })
})



