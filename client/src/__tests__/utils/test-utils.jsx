import React from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export function MockAuthProvider({ children, user = null, loading = false, logout = () => {} }) {
    const value = { user, loading, logout, refreshUser: () => {} }
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export function renderWithProviders(ui, { route = "/", auth = {}, wrapper: CustomWrapper } = {}) {
    const Wrapper = ({ children }) => (
        <MemoryRouter initialEntries={[route]}>
            <MockAuthProvider {...auth}>
                {CustomWrapper ? <CustomWrapper>{children}</CustomWrapper> : children}
            </MockAuthProvider>
        </MemoryRouter>
    )
    return render(ui, { wrapper: Wrapper })
}



