import api from "@/services/api"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export default function CheckoutButton({ children = "Upgrade to Pro", className = "" }) {
    const handleCheckout = async () => {
        try{
            const res = await api.post("/payments/create-checkout-session", { plan: "free" })
            const { id } = res.data
    
            const stripe = await stripePromise
            await stripe.redirectToCheckout({ sessionId: id })
        } catch (error) {
            console.error("Error during checkout:", error)
            alert("Failed to initiate checkout. Please try again.")
            return
        }   
    }

    return (
        <button onClick={handleCheckout} className={className}>
            {children}
        </button>
    )
}
