import { BrowserRouter as Router } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Layout from "./components/Layout"
import { MainRoute } from "./routes"

export const App =() => {
    return (
        <Router>
            <AuthProvider>
                <Layout>
                    <MainRoute />
                </Layout>
            </AuthProvider>
        </Router>
    )
}

