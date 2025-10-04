import React from "react"
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Badge } from "../../../components/ui/badge"

describe("UI Badge", () => {
    it("renders", () => {
        render(<Badge>New</Badge>)
        expect(screen.getByText(/New/)).toBeInTheDocument()
    })
})



