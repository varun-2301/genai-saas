import React from "react"
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Button } from "../../../components/ui/button"

describe("UI Button", () => {
    it("renders children", () => {
        render(<Button>Click</Button>)
        expect(screen.getByRole("button", { name: /click/i })).toBeInTheDocument()
    })
})



