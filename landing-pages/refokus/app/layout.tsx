import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL('https://refokus-rouge.vercel.app/'),
    title: "Refokus | Premium Web Design & Development",
    description: "Award-winning web design and development agency crafting digital experiences that matter.",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://refokus-rouge.vercel.app/",
        title: "Refokus | Premium Web Design & Development",
        description: "Award-winning web design and development agency crafting digital experiences that matter.",
        siteName: "Refokus",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Refokus Agency Interface",
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
            <body>{children}</body>
        </html>
    );
}
