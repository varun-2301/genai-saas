import React from "react"
import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { ResumeScore } from "../../../pages/ResumeReview/ResumeScore"
import { renderWithProviders } from "../../utils/test-utils"

describe("ResumeScore", () => {
    it("renders score sections", () => {
        const scores = { atsScore: 70, skillsMatched: ["JS"], missingSkills: ["Go"], improvementSuggestions: ["Add tests"] }
        renderWithProviders(<ResumeScore scores={scores} />)
        expect(screen.getByText(/Resume Scorecard/i)).toBeInTheDocument()
        expect(screen.getByText(/ATS Compatibility/i)).toBeInTheDocument()
    })
})



