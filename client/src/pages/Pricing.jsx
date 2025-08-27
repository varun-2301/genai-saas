import { FaRocket, FaStar, FaCheckCircle } from "react-icons/fa"

export const Pricing = () => {
    return (
        <div className="min-h-[calc(100dvh-4rem)] flex items-center justify-center px-4">
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Free Plan */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FaRocket className="text-blue-500" /> Free Plan
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Get started for free and explore our SaaS prompt generator.
                    </p>
                    <div className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
                        <p className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-500" /> 5 free prompts
                        </p>
                        <p className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-500" /> Dashboard & History
                        </p>
                        <p className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-500" /> Basic Support
                        </p>
                    </div>
                    
                    <div className="mt-auto pt-6">
                        <button className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-lg font-semibold">
                        Current Plan
                        </button>
                    </div>
                </div>

                {/* Pro Plan */}
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg p-8 text-white flex flex-col">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <FaStar className="text-yellow-300" /> Pro Plan
                    </h2>
                    <p className="mt-2 text-purple-100">
                        Unlock unlimited access and premium features.
                    </p>
                    <div className="mt-6 space-y-3">
                        <p className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-300" /> Unlimited prompts
                        </p>
                        <p className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-300" /> Advanced analytics
                        </p>
                        <p className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-300" /> Priority Support
                        </p>
                    </div>
                    <div className="mt-auto pt-6">
                        <button className="w-full bg-white text-purple-700 hover:bg-purple-100 px-4 py-3 rounded-lg font-semibold shadow">
                            Upgrade to Pro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
