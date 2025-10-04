import React from "react"
import { describe, it, vi, beforeEach, expect } from "vitest"
import { screen, fireEvent } from "@testing-library/react"
import { RagUpload } from "../../pages/RagUpload"
import { renderWithProviders } from "../utils/test-utils"

vi.mock("../../services/api", () => ({
    default: { post: vi.fn((url) => {
        if (url.includes("/rag/upload")) return Promise.resolve({ success: true, data: { message: "ok" } })
        return Promise.resolve({ success: true, data: { answer: "42" } })
    }) }
}))

vi.mock("react-hot-toast", () => ({
    __esModule: true,
    default: { success: vi.fn(), error: vi.fn(), dismiss: vi.fn(), loading: vi.fn(() => "t") },
}))

describe("RagUpload", () => {
    beforeEach(() => vi.clearAllMocks())

    it("renders upload controls", () => {
        renderWithProviders(<RagUpload />)
        expect(screen.getByText(/Upload your PDF/i)).toBeInTheDocument()
    })
})



