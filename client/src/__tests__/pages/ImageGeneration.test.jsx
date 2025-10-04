import React from "react"
import { describe, it, vi, beforeEach } from "vitest"
import { screen, fireEvent, act } from "@testing-library/react"
import { ImageGeneration } from "../../pages/ImageGeneration"
import { renderWithProviders } from "../utils/test-utils"

vi.mock("../../services/api", () => ({
    default: {
        post: vi.fn(() => Promise.resolve({ success: true, data: { imageUrl: "http://example.com/img.png" } })),
        get: vi.fn(() => Promise.resolve({ success: true, data: {} }))
    }
}))

vi.mock("react-hot-toast", () => ({
    __esModule: true,
    default: { success: vi.fn(), error: vi.fn(), dismiss: vi.fn(), loading: vi.fn(() => "t") },
}))

describe("ImageGeneration", () => {
    beforeEach(() => vi.clearAllMocks())

    it("renders and generates image", async () => {
        renderWithProviders(<ImageGeneration />)
        const input = screen.getByPlaceholderText(/describe your image/i)
        fireEvent.change(input, { target: { value: "A cat" } })
        const button = screen.getByRole("button", { name: /generate/i })
        await act(async () => {
            fireEvent.click(button)
        })
    })
})



