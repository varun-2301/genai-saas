import React from "react"
import { describe, it } from "vitest"
import { render } from "@testing-library/react"
import { Progress } from "../../../components/ui/progress"

describe("UI Progress", () => {
    it("renders", () => {
        const { container } = render(<Progress value={50} />)
        expect(container.querySelector('[data-slot="progress"]')).toBeInTheDocument()
    })
})



