import React from "react"
import { describe, it } from "vitest"
import { render } from "@testing-library/react"
import { Input } from "../../../components/ui/input"

describe("UI Input", () => {
    it("renders", () => {
        const { container } = render(<Input type="text" />)
        expect(container.querySelector('input')).toBeInTheDocument()
    })
})



