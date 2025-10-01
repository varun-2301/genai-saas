import React from "react"
import { describe, it, vi, beforeEach } from "vitest"
import { screen } from "@testing-library/react"
import { Dashboard } from "../../../pages/Dashboard"
import { renderWithProviders } from "../../utils/test-utils"

vi.mock("../../../services/api", () => ({
    default: { get: vi.fn(() => Promise.resolve({ success: true, data: [] })) }
}))

vi.mock("../../../hooks/useUsage", () => ({
    useUsage: () => ({ usage: { promptUsed: 0, promptMaxLimit: 5, ragUsed: 0, ragMaxLimit: 2, imageUsed: 0, imageMaxLimit: 2 }, usageLoading: false })
}))

describe("Dashboard page", () => {
    beforeEach(() => vi.clearAllMocks())

    it("renders heading", () => {
        renderWithProviders(<Dashboard />, { auth: { user: { name: "A" } } })
        expect(screen.getByText(/Your Dashboard/i)).toBeInTheDocument()
    })
})



