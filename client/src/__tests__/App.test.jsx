import React from "react"
import { describe, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { App } from "../App"

vi.mock("../routes", () => ({ MainRoute: () => <div>Main</div> }))

describe("App", () => {
    it("renders main route", () => {
        render(<App />)
        expect(screen.getByText(/Main/i)).toBeInTheDocument()
    })
})



