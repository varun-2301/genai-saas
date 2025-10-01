import React from "react"
import { describe, it } from "vitest"
import { screen } from "@testing-library/react"
import { Usage } from "../../../pages/Dashboard/Usage"
import { renderWithProviders } from "../../utils/test-utils"

describe("Usage", () => {
    it("renders skeleton when loading", () => {
        renderWithProviders(<Usage loading={true} usage={{}} />)
        expect(screen.getAllByRole("status").length).toBeGreaterThan(0)
    })

    it("renders bars when not loading", () => {
        renderWithProviders(<Usage loading={false} usage={{ promptUsed: 1, promptMaxLimit: 5, ragUsed: 0, ragMaxLimit: 2, imageUsed: 1, imageMaxLimit: 2 }} />)
        expect(screen.getByText(/Prompt Usage/i)).toBeInTheDocument()
    })
})



