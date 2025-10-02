import React from "react"
import { describe, it } from "vitest"
import { screen } from "@testing-library/react"
import { MainRoute } from "../../routes/MainRoute"
import { renderWithProviders } from "../utils/test-utils"

vi.mock("react", async (importOriginal) => {
    const mod = await importOriginal()
    return { ...mod, Suspense: ({ children }) => <>{children}</> }
})

vi.mock("../../pages", () => ({
    Login: () => <div>Login</div>,
    Dashboard: () => <div>Dashboard</div>,
    PromptGenerator: () => <div>PromptGenerator</div>,
    ResumeReview: () => <div>ResumeReview</div>,
    RagUpload: () => <div>RagUpload</div>,
    Profile: () => <div>Profile</div>,
    Pricing: () => <div>Pricing</div>,
    ImageGeneration: () => <div>ImageGeneration</div>,
}))

describe("MainRoute", () => {
    it("renders login on root", async () => {
        renderWithProviders(<MainRoute />, { route: "/" })
        expect(await screen.findByText(/Login/i)).toBeInTheDocument()
    })
})



