import React from "react"
import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Skeleton } from "../../../components/ui/skeleton"

describe("UI Skeleton", () => {
    it("renders", () => {
        const { container } = render(<Skeleton className="h-4 w-4" />)
        expect(container.querySelector('[data-slot="skeleton"]')).toBeInTheDocument()
    })
})



