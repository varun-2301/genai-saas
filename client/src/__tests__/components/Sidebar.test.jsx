import React from "react"
import { describe, it, expect } from "vitest"
import { screen, fireEvent } from "@testing-library/react"
import { Sidebar } from "../../components/Sidebar"
import { renderWithProviders } from "../utils/test-utils"

describe("Sidebar", () => {
    it("renders links", () => {
        renderWithProviders(<Sidebar />)
        expect(screen.getByText(/Dashboard/i)).toBeInTheDocument()
        expect(screen.getByText(/Prompt Generate/i)).toBeInTheDocument()
        expect(screen.getByText(/Resume Review/i)).toBeInTheDocument()
        expect(screen.getByText(/Pricing/i)).toBeInTheDocument()
        expect(screen.getByText(/RAG Q&A/i)).toBeInTheDocument()
        expect(screen.getByText(/Image Generation/i)).toBeInTheDocument()
    })

    it("opens and closes mobile menu", () => {
        renderWithProviders(<Sidebar />)
        const toggle = screen.getByRole("button")
        fireEvent.click(toggle) // open
        // clicking overlay closes
        const overlay = document.querySelector(".fixed.inset-0")
        if (overlay) {
            fireEvent.click(overlay)
        }
    })
})



