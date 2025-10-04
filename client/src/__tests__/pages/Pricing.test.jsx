import React from "react"
import { describe, it, vi, beforeEach, expect } from "vitest"
import { screen, fireEvent, act } from "@testing-library/react"
import { Pricing } from "../../pages/Pricing"
import { renderWithProviders } from "../utils/test-utils"

vi.mock("../../services/api", () => ({
    default: { 
        post: vi.fn(() => Promise.resolve({ success: true, data: { id: "sess_123" } })), 
        get: vi.fn(() => Promise.resolve({ success: true, data: { message: "ok" } })) 
    }
}))

vi.mock("@stripe/stripe-js", () => ({
    loadStripe: () => Promise.resolve({ redirectToCheckout: vi.fn(() => Promise.resolve()) })
}))

vi.mock("react-hot-toast", () => ({
    __esModule: true,
    default: { success: vi.fn(), error: vi.fn(), dismiss: vi.fn(), loading: vi.fn(() => "t") },
}))

describe("Pricing page", () => {
    beforeEach(() => vi.clearAllMocks())

    it("renders plans and buttons", () => {
        renderWithProviders(<Pricing />, { auth: { user: { plan: "FREE", isPro: false }, refreshUser: vi.fn() } })
        expect(screen.getByText(/Free Plan/i)).toBeInTheDocument()
        expect(screen.getByText(/Pro Plan/i)).toBeInTheDocument()
    })

    it("handles clicks on upgrade/downgrade", async () => {
        renderWithProviders(<Pricing />, { auth: { user: { plan: "FREE", isPro: false }, refreshUser: vi.fn() } })
        const upgrade = screen.getByRole("button", { name: /Upgrade to Pro/i })
        await act(async () => {
            fireEvent.click(upgrade)
        })
    })
})


