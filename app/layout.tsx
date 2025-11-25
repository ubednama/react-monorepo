import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskMatrix - Eisenhower Matrix Productivity App",
  description: "Master your productivity with the Eisenhower Matrix. Prioritize tasks effectively using Do First, Schedule, Delegate, and Eliminate quadrants.",
  keywords: ["productivity", "eisenhower matrix", "task management", "todo list", "prioritization", "time management"],
  authors: [{ name: "TaskMatrix Team" }],
  creator: "TaskMatrix",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://taskmatrix.app",
    title: "TaskMatrix - Master Your Productivity",
    description: "Organize your life with the Eisenhower Matrix method.",
    siteName: "TaskMatrix",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TaskMatrix App Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskMatrix - Prioritize Like a Pro",
    description: "Simple, effective task management using the Eisenhower Matrix.",
    images: ["/og-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} theme-transition`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
