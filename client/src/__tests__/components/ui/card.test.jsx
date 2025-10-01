import React from "react"
import { describe, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../components/ui/card"

describe("UI Card", () => {
    it("renders slots", () => {
        render(
            <Card>
                <CardHeader>
                    <CardTitle>Title</CardTitle>
                </CardHeader>
                <CardContent>Content</CardContent>
                <CardFooter>Footer</CardFooter>
            </Card>
        )
        expect(screen.getByText(/Title/)).toBeInTheDocument()
        expect(screen.getByText(/Content/)).toBeInTheDocument()
        expect(screen.getByText(/Footer/)).toBeInTheDocument()
    })
})



