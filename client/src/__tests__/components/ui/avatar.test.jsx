import React from "react"
import { describe, it } from "vitest"
import { render } from "@testing-library/react"
import { Avatar, AvatarImage, AvatarFallback } from "../../../components/ui/avatar"

describe("UI Avatar", () => {
    it("renders", () => {
        const { container } = render(
            <Avatar>
                <AvatarImage src="/avatar.png" alt="a" />
                <AvatarFallback>AA</AvatarFallback>
            </Avatar>
        )
        expect(container.querySelector('[data-slot="avatar"]')).toBeInTheDocument()
    })
})



