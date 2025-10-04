import React from "react"
import { describe, it, vi, expect } from "vitest"
import { screen, fireEvent } from "@testing-library/react"
import { Navbar } from "../../components/Navbar"
import { renderWithProviders } from "../utils/test-utils"

describe("Navbar", () => {
    it("renders brand when hideUserDropdown is true", () => {
        renderWithProviders(<Navbar hideUserDropdown={true} />)
        expect(screen.getByAltText(/genai logo/i)).toBeInTheDocument()
        expect(screen.getByText(/GenAI SaaS/i)).toBeInTheDocument()
    })

    it("toggles dropdown and calls logout", () => {
        const logout = vi.fn()
        renderWithProviders(<Navbar />, { auth: { user: { name: "Test" }, logout } })

        const userBtn = screen.getByRole("button")
        fireEvent.click(userBtn)
        // Dropdown should appear
        expect(screen.getByText(/Profile/i)).toBeInTheDocument()
        fireEvent.click(screen.getByText(/Logout/i))
        expect(logout).toHaveBeenCalled()
    })
})


