import React from "react"
import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { Profile } from "../../pages/Profile"
import { renderWithProviders } from "../utils/test-utils"

describe("Profile", () => {
    it("renders user details when provided", () => {
        const user = { name: "John", email: "john@example.com", isPro: true, photoUrl: "http://example.com/a.png" }
        renderWithProviders(<Profile />, { auth: { user } })
        expect(screen.getByText(/Profile/i)).toBeInTheDocument()
        expect(screen.getByText(/John/)).toBeInTheDocument()
        expect(screen.getByText(/john@example.com/)).toBeInTheDocument()
    })
})



