import React from "react"
import { describe, it } from "vitest"
import { render } from "@testing-library/react"
import { Textarea } from "../../../components/ui/textarea"

describe("UI Textarea", () => {
    it("renders", () => {
        const { container } = render(<Textarea />)
        expect(container.querySelector('textarea')).toBeInTheDocument()
    })
})



