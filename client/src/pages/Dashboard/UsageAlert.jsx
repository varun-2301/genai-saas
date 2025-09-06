import { FaExclamationTriangle } from "react-icons/fa"
import { Button } from "@/components/ui/button"

export const UsageAlert = ({message, handleClick}) => {
    return (
        <div className="flex items-center justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md">
            <div className="flex items-center gap-3">
                <FaExclamationTriangle className="text-red-600 text-lg" />
                    <p className="font-medium">
                        {message}
                    </p>
            </div>
            <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                onClick={handleClick}
            >
                Upgrade Plan
            </Button>
        </div>
    )
}