import React from "react"
import { describe, it, vi, beforeEach } from "vitest"
import { screen, fireEvent } from "@testing-library/react"
import { ResumeReview } from "../../../pages/ResumeReview/ResumeReview"
import { renderWithProviders } from "../../utils/test-utils"

vi.mock("../../../services/api", () => ({
    default: { post: vi.fn(() => Promise.resolve({ success: true, data: { review: "Great", scorecard: { atsScore: 80, skillsMatched: ["JS"], missingSkills: ["Go"], improvementSuggestions: ["More projects"] } } })) }
}))

vi.mock("react-hot-toast", () => ({
    __esModule: true,
    default: { success: vi.fn(), error: vi.fn(), dismiss: vi.fn(), loading: vi.fn(() => "t") },
}))

vi.mock("../../../utils/helper", () => ({ isFreeUser: () => false }))

describe("ResumeReview", () => {
    beforeEach(() => vi.clearAllMocks())

    it("renders and triggers review", async () => {
        renderWithProviders(<ResumeReview />, { auth: { user: { isPro: true } } })
        const textarea = screen.getByPlaceholderText(/paste your resume text/i)
        fireEvent.change(textarea, { target: { value: "Content" } })
        const button = screen.getByRole("button", { name: /get ai review/i })
        fireEvent.click(button)
    })
})



