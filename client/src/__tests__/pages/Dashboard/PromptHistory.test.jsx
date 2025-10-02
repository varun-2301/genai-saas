import React from "react"
import { describe, it } from "vitest"
import { screen } from "@testing-library/react"
import { PromptHistory } from "../../../pages/Dashboard/PromptHistory"
import { renderWithProviders } from "../../utils/test-utils"

describe("PromptHistory", () => {
    it("renders empty state", () => {
        renderWithProviders(<PromptHistory loading={false} history={[]} user={{}} />)
        expect(screen.getByText(/No prompts yet/i)).toBeInTheDocument()
    })
})



