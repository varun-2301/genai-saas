import api from "@/services/api"
import { loadStripe } from "@stripe/stripe-js"
import toast from "react-hot-toast"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export default function CheckoutButton({ children = "Upgrade to Pro", className = "" }) {
    const handleCheckout = async () => {
        try{
            const res = await api.post("/payments/create-checkout-session", { plan: "paid" })
            const { id } = res.data
    
            const stripe = await stripePromise
            await stripe.redirectToCheckout({ sessionId: id })
        } catch (error) {
            console.error("Error during checkout:", error)
            toast.error("Error during checkout")
            return
        }   
    }

    return (
        <button onClick={handleCheckout} className={`${className} cursor-pointer`}>
            {children}
        </button>
    )
}
