import CheckoutButton from "@/components/CheckoutButton"
import { useAuth } from "../context/AuthContext"
import { FaRocket, FaStar, FaCheckCircle } from "react-icons/fa"
import { FREE_PLAN_NAME, PAID_PLAN_NAME } from "../utils/constants"

const FEATURES = {
    FREE_PLAN_NAME : [
        '5 free prompts per day',
        '5 free resume text reviews per day',
        '2 RAG based reviews'
    ],
    PAID_PLAN_NAME : [
        '10 free prompts per day',
        '10 free resume text reviews per day with scorecard',
        '5 RAG based reviews'
    ]
}

export const Pricing = () => {
    const { user } = useAuth()

    // const renderFeatures = (type) => {
    //     console.log(type)
    //     const featuresList = FEATURES[type]
    //     console.log(FEATURES[type])
    //     return featuresList.map((feat, i) => (
    //         <p className="flex items-center gap-2" key={i}>
    //             <FaCheckCircle className="text-green-500" /> {feat}
    //         </p>
    //     ))
    // }

    return (
        <div className="min-h-[calc(64dvh-4rem)] flex items-center justify-center px-4">
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Free Plan */}
                <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col ${user.plan === FREE_PLAN_NAME ? 'ring-2 ring-purple-500' : ''}`}>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FaRocket className="text-blue-500" /> Free Plan
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Get started for free and explore our SaaS features.
                    </p>
                    <div className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
                        <p className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-500" /> 5 free prompts per day
                        </p>
                        <p className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-500" /> 5 free resume text reviews per day
                        </p>
                        <p className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-500" /> 2 RAG based reviews
                        </p>
                    </div>
                    
                    <div className="mt-auto pt-6">
                        <button className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-lg font-semibold">
                            {user.plan === FREE_PLAN_NAME ? 'Current Plan' : 'Downgrade to Free'}
                        </button>
                    </div>
                </div>

                {/* Pro Plan */}
                <div className={`bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg p-8 text-white flex flex-col ${user.plan === PAID_PLAN_NAME ? 'ring-4 ring-yellow-300' : ''}`}>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <FaStar className="text-yellow-300" /> Pro Plan
                    </h2>
                    <p className="mt-2 text-purple-100">
                        Unlock unlimited access and premium features.
                    </p>
                    <div className="mt-6 space-y-3">
                        <p className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-300" /> 10 free prompts per day
                        </p>
                        <p className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-300" /> 10 free resume text reviews per day with scorecard
                        </p>
                        <p className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-300" /> 5 RAG based reviews
                        </p>
                    </div>
                    <div className="mt-auto pt-6">
                        <CheckoutButton className="w-full bg-white text-purple-700 hover:bg-purple-100 px-4 py-3 rounded-lg font-semibold shadow">
                            {user.plan === PAID_PLAN_NAME ? 'Current Plan' : 'Upgrade to Pro'}
                        </CheckoutButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
