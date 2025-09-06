import { useState } from 'react'
import { FaHistory, FaChevronDown, FaChevronUp, FaCheckCircle, FaTimesCircle, FaStar, FaLightbulb, 
    FaFileAlt, FaImage, FaSearch, FaKeyboard } from "react-icons/fa"

import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { isFreeUser } from '@/utils/helper'

export const PromptHistory = ({ loading, history, user }) => {
    const [expanded, setExpanded] = useState({})

    const getTypeConfig = (type) => {
        switch (type) {
            case "resume":
                return {
                    label: "Resume",
                    icon: <FaFileAlt className="text-blue-600 dark:text-blue-300" />,
                    style: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                }
            case "image":
                return {
                    label: "Image",
                    icon: <FaImage className="text-green-600 dark:text-green-300" />,
                    style: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                }
            case "rag":
                return {
                    label: "RAG",
                    icon: <FaSearch className="text-yellow-600 dark:text-yellow-300" />,
                    style: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                }
            default: // normal prompt
                return {
                    label: "Prompt",
                    icon: <FaKeyboard className="text-purple-600 dark:text-purple-300" />,
                    style: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                }
        }
    }

    const showScorecard = !isFreeUser(user)

    return (
        <Card className="bg-white dark:bg-gray-800 shadow p-6 rounded-lg">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
                <FaHistory /> Prompt History
            </h2>

            {loading ? (
                <ul className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <li key={i} className="space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </li>
                    ))}
                </ul>
            ) : history.length === 0 ? (
                <p className="text-gray-500">No prompts yet.</p>
            ) : (
                <div className="max-h-96 overflow-y-auto space-y-6">
                    {history.map((item) => {
                        const { label, icon, style } = getTypeConfig(item.type)
                        return (
                            <Card
                                key={item._id}
                                className="p-4 shadow-md bg-gray-50 dark:bg-gray-900 rounded-lg"
                            >
                                {/* Header with label + icon */}
                                <div className="flex justify-between items-center mb-3">
                                    <span className={`flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${style}`}>
                                        {icon} {label}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </span>
                                </div>

                                {/* Prompt bubble */}
                                <div className="flex justify-end mb-2">
                                    <div className="bg-purple-600 text-white px-3 py-2 rounded-lg max-w-full md:max-w-xl text-sm break-words overflow-hidden">
                                        <strong>Prompt:</strong> {item.prompt}
                                    </div>
                                </div>

                                {/* Response bubble */}
                                <div className="flex justify-start mb-2">
                                    <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg max-w-full md:max-w-xl text-sm break-words overflow-hidden">
                                        <strong>Response:</strong> {item.response}
                                    </div>
                                </div>

                                {/* Resume Scorecard Accordion */}
                                {item.type === "resume" && showScorecard &&  (
                                    <div className="mt-2">
                                        <button
                                            className="flex items-center justify-between w-full text-sm font-medium text-left text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                            onClick={() =>
                                                setExpanded((prev) => ({
                                                    ...prev,
                                                    [item._id]: !prev[item._id],
                                                }))
                                            }
                                        >
                                            <span>Resume Scorecard</span>
                                            {expanded[item._id] ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>

                                        {expanded[item._id] && (
                                            <div className="mt-3 p-3 border rounded-lg bg-white dark:bg-gray-800 max-h-60 overflow-y-auto text-sm space-y-3">
                                                <p className="flex items-center gap-2">
                                                    <FaStar className="text-yellow-500" />
                                                    <strong>ATS Score:</strong>{" "}
                                                    {item.scorecard?.atsScore || "N/A"}
                                                </p>

                                                <p className="flex items-center gap-2">
                                                    <FaCheckCircle className="text-green-500" />
                                                    <strong>Matched Skills:</strong>{" "}
                                                    {item.scorecard?.skillsMatched?.join(", ") || "N/A"}
                                                </p>
                                                
                                                <p className="flex items-center gap-2">
                                                    <FaTimesCircle className="text-red-500" />
                                                    <strong>Missing Skills:</strong>{" "}
                                                    {item.scorecard?.missingSkills?.join(", ") || "N/A"}
                                                </p>
                                                
                                                <p className="flex items-center gap-2">
                                                    <FaLightbulb className="text-blue-500" />
                                                    <strong>Suggestions:</strong>{" "}
                                                    {item.scorecard?.improvementSuggestions?.join(", ") ||
                                                    "N/A"}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Card>
                        )
                    })}
                </div>
            )}
        </Card>
    )
}
