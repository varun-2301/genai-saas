import { useState, useEffect } from "react";
import api from "../services/api.js";

const Generate = () => {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [usage, setUsage] = useState({ promptsUsed: 0, remaining: 5 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch usage on mount
    useEffect(() => {
        const fetchUsage = async () => {
            try {
                const { data } = await api.get("/auth/usage");
                setUsage(data);
            } catch (err) {
                console.error("Usage fetch failed:", err.response?.data || err.message);
            }
        };

        fetchUsage();
    }, []);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        setError("");
        setResult("");

        try {
            const { data } = await api.post(
                "/prompts/generate",
                { prompt },
                //{ withCredentials: true }
            );
            setResult(data.result);

            // Update usage after success
            const usageRes = await api.get("/auth/usage");
            setUsage(usageRes.data);
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4 text-white">SaaS Prompt Generator</h2>

            <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 border rounded mb-4 dark:bg-gray-800 dark:text-white"
                placeholder="Enter your SaaS prompt (e.g., write a landing page headline)..."
            />

            <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
                {loading ? "Generating..." : "Generate"}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="mt-6">
                <h4 className="font-semibold text-white">Response:</h4>
                <p className="whitespace-pre-line mt-2 bg-gray-100 dark:bg-gray-800 p-3 rounded">
                {result}
                </p>
            </div>

            <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                {usage.promptsUsed} / 5 free prompts used
            </div>
        </div>
    )
}

export default Generate;
