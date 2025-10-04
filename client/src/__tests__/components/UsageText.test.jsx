import React from "react"
import { describe, it, vi, expect } from "vitest"
import { screen } from "@testing-library/react"
import { UsageText } from "../../components/UsageText"
import { renderWithProviders } from "../utils/test-utils"

vi.mock("../../hooks/useUsage", () => ({
    useUsage: () => ({ usage: { promptUsed: 1, promptMaxLimit: 5 }, usageLoading: false, fetchUsage: () => {} })
}))

describe("UsageText", () => {
    it("renders usage numbers", () => {
        renderWithProviders(<UsageText type="prompt" />)
        expect(screen.getByText(/1 \/ 5 prompt used/i)).toBeInTheDocument()
    })
})


