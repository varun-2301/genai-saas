import React from "react"
import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { Layout } from "../../components/Layout"
import { renderWithProviders } from "../utils/test-utils"

describe("Layout", () => {
    it("renders navbar and optional sidebar", () => {
        renderWithProviders(<Layout><div>Child</div></Layout>, { route: "/dashboard" })
        expect(screen.getByText(/GenAI SaaS/i)).toBeInTheDocument()
        expect(screen.getByText(/Child/)).toBeInTheDocument()
    })

    it("hides user dropdown on login page", () => {
        renderWithProviders(<Layout><div>Child</div></Layout>, { route: "/" })
        expect(screen.getByText(/GenAI SaaS/i)).toBeInTheDocument()
    })
})



