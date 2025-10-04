import React from "react"
import { describe, it, vi, expect } from "vitest"
import { screen, fireEvent } from "@testing-library/react"
import { CheckoutButton } from "../../components/CheckoutButton"
import { renderWithProviders } from "../utils/test-utils"

describe("CheckoutButton", () => {
    it("renders and calls handleClick", () => {
        const handleClick = vi.fn()
        renderWithProviders(<CheckoutButton handleClick={handleClick}>Buy</CheckoutButton>)
        const btn = screen.getByRole("button", { name: /buy/i })
        fireEvent.click(btn)
        expect(handleClick).toHaveBeenCalled()
    })
})



