import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface LoadingBarProps {
    className?: string
}

export function LoadingBar({ className }: LoadingBarProps) {
    return (
        <div className={cn("w-64 h-1 bg-gray-800 rounded-full overflow-hidden", className)}>
            <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
        </div>
    )
}
