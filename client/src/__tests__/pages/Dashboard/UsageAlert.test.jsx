import React from "react"
import { describe, it, vi, expect } from "vitest"
import { screen, fireEvent } from "@testing-library/react"
import { UsageAlert } from "../../../pages/Dashboard/UsageAlert"
import { renderWithProviders } from "../../utils/test-utils"

describe("UsageAlert", () => {
    it("renders message and handles click", () => {
        const onClick = vi.fn()
        renderWithProviders(<UsageAlert message="Test" handleClick={onClick} />)
        expect(screen.getByText(/Test/)).toBeInTheDocument()
        fireEvent.click(screen.getByRole("button", { name: /Upgrade Plan/i }))
        expect(onClick).toHaveBeenCalled()
    })
})



