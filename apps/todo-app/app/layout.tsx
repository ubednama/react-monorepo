import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL('https://todo-app-mu-rouge.vercel.app/'),
    title: "Todo App | Simple & Efficient",
    description: "A streamlined task management application to clear your mind and boost productivity.",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://todo-app-mu-rouge.vercel.app/",
        title: "Todo App | Simple & Efficient",
        description: "A streamlined task management application to clear your mind and boost productivity.",
        siteName: "Todo App",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Todo App Interface",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
