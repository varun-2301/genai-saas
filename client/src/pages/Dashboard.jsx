import { useEffect, useState } from 'react'
import api from '../services/api.js';

export const Dashboard = () => {
  const [usage, setUsage] = useState(null);
  const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const usageRes = await api.get('/auth/me');
            setUsage(usageRes.data);

            const promptRes = await api.get('/prompts/history');
            setHistory(promptRes.data);
        } catch (err) {
            console.error('Failed to fetch dashboard data', err);
        }
    }

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>

            {usage && (
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <h2 className="text-lg font-semibold mb-2">Usage</h2>
                    <p>{usage?.prompts?.used}/{usage?.prompts?.limit} prompts used</p>
                </div>
            )}

            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold mb-2">Prompt History</h2>
                {history.length === 0 ? (
                    <p className="text-gray-500">No prompts yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {history.map((item) => (
                        <li key={item._id} className="border-b py-2">
                            <strong>Prompt:</strong> {item.prompt} <br />
                            <strong>Response:</strong> {item.response}
                        </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

