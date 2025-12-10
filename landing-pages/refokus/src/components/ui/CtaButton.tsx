"use client";
import { IoIosReturnRight } from "react-icons/io";
import { Button } from "@repo/ui";

interface CtaButtonProps {
    title?: string;
    className?: string;
    onClick?: () => void;
}

export const CtaButton = ({ title = "Get Started", className, onClick }: CtaButtonProps) => {
    return (
        <Button
            variant="outline"
            className={`w-40 px-4 py-2 cursor-pointer bg-zinc-100 flex justify-between items-center text-black rounded-full border-none hover:bg-zinc-200 ${className || ''}`}
            onClick={onClick}
        >
            <span className="text-sm font-medium">{title}</span>
            <IoIosReturnRight />
        </Button>
    );
};
