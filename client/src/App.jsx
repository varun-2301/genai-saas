import { BrowserRouter as Router } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { MainRoute } from "./routes"

export const App =() => {
    return (
        <Router>
            <AuthProvider>
                <MainRoute />
            </AuthProvider>
        </Router>
    )
}

