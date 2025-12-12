import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL('https://positivus-ebon-one.vercel.app/'),
    title: "Positivus | Creative Digital Agency",
    description: "Navigating the digital landscape for success. We help businesses grow through strategic design and marketing.",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://positivus-ebon-one.vercel.app/",
        title: "Positivus | Creative Digital Agency",
        description: "Navigating the digital landscape for success. We help businesses grow through strategic design and marketing.",
        siteName: "Positivus",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Positivus Agency Branding",
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
