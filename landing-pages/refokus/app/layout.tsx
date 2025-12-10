import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Refokus",
    description: "Refokus landing page",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>{children}</body>
        </html>
    );
}
