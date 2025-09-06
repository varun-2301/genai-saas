import { useState } from "react"
import { FaRocket, FaStar, FaCheckCircle } from "react-icons/fa"
import { loadStripe } from "@stripe/stripe-js"
import toast from "react-hot-toast"

import { CheckoutButton} from "@/components/CheckoutButton"
import api from "../services/api"
import { useAuth } from "../context/AuthContext"
import { FREE_PLAN_NAME, PAID_PLAN_NAME } from "../utils/constants"
import { isFreeUser } from "@/utils/helper"

const FEATURES = {
    'FREE' : [
        '5 free prompts/resume-text reviews per day',
        '2 RAG based reviews per day',
        '2 Image Generations per day'
    ],
    'PRO' : [
        '10 free prompts/resume-text reviews per day',
        '5 RAG based reviews per day',
        '5 Image Generations per day'
    ]
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export const Pricing = () => {
    const { user, refreshUser } = useAuth()
    const [loading, setLoading] = useState(false)

    const renderFeatures = (type) => {
        const featuresList = FEATURES[type]
        return (
            <div className={`mt-6 space-y-3 ${type === FREE_PLAN_NAME ? 'text-gray-700 dark:text-gray-300' : ''}`}>
                {featuresList.map((feat, i) => (
                    <p className="flex items-center gap-2" key={i}>
                        <FaCheckCircle className="text-green-500" /> {feat}
                    </p>
                ))}
            </div>
        )
    }

    const handlePaidCheckout = async () => {
        setLoading(true)
        try{
            const res = await api.post("/payments/create-checkout-session", { plan: "paid" })
            
            if(res?.success){
                setLoading(false)
                const { id } = res.data
                const stripe = await stripePromise
                await stripe.redirectToCheckout({ sessionId: id })
            }
        } catch (error) {
            console.error("Error during checkout:", error)
            setLoading(false)
        }   
    }

    const handleFreeCheckout = async () => {
        setLoading(true)
        try{
            const data = await api.get("/user/downgrade-plan")
            if(data?.success){
                toast.success(data.data.message)
                await refreshUser()
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.error("Error during checkout:", error)
        }   
    }

    return (
        <div className="min-h-[calc(64dvh-4rem)] flex items-center justify-center px-4">
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Free Plan */}
                <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col ${isFreeUser(user) ? 'ring-2 ring-purple-500' : ''}`}>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FaRocket className="text-blue-500" /> Free Plan
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Get started for free and explore our SaaS features.
                    </p>
                    
                    {renderFeatures(FREE_PLAN_NAME)}
                    
                    <div className="mt-auto pt-6">
                        {/* <button className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-lg font-semibold">
                            
                        </button> */}
                        <CheckoutButton className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-lg font-semibold" handleClick={handleFreeCheckout} loading={user.plan === FREE_PLAN_NAME ? true : loading}>
                            {isFreeUser(user) ? 'Current Plan' : 'Downgrade to Free'}
                        </CheckoutButton>
                    </div>
                </div>

                {/* Pro Plan */}
                <div className={`bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg p-8 text-white flex flex-col ${!isFreeUser(user) ? 'ring-4 ring-yellow-300' : ''}`}>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <FaStar className="text-yellow-300" /> Pro Plan
                    </h2>
                    <p className="mt-2 text-purple-100">
                        Unlock unlimited access and premium features.
                    </p>
                    
                    {renderFeatures(PAID_PLAN_NAME)}
                    
                    <div className="mt-auto pt-6">
                        <CheckoutButton className="w-full bg-white text-purple-700 hover:bg-purple-100 px-4 py-3 rounded-lg font-semibold shadow" handleClick={handlePaidCheckout} loading={user.plan === PAID_PLAN_NAME ? true : loading}>
                            {!isFreeUser(user) ? 'Current Plan' : 'Upgrade to Pro'}
                        </CheckoutButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
