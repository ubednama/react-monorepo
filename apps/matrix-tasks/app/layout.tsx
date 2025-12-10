import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://taskmatrix.app'),
  title: "TaskMatrix | Smart Eisenhower Matrix Task Manager",
  description: "Boost your productivity with TaskMatrix. The ultimate Eisenhower Matrix app to prioritize tasks, eliminate distractions, and focus on what matters most. Free, private, and simple.",
  keywords: [
    "Eisenhower Matrix",
    "Task Management",
    "Productivity App",
    "Time Management Tool",
    "Priority Matrix",
    "Todo List",
    "Urgent vs Important",
    "Task Prioritization",
    "Focus Tool"
  ],
  authors: [{ name: "TaskMatrix Team" }],
  creator: "TaskMatrix",
  icons: {
    icon: "/matrix-logo.svg",
    shortcut: "/matrix-logo.svg",
    apple: "/matrix-logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://taskmatrix.app",
    title: "TaskMatrix | Master Your Priorities",
    description: "Stop drowning in tasks. Start managing them with the proven Eisenhower method. Simple, fast, and effective.",
    siteName: "TaskMatrix",
    images: [
      {
        url: "/og-image.png", // Assuming an OG image exists or will exist, standard naming
        width: 1200,
        height: 630,
        alt: "TaskMatrix App Interface Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskMatrix - Prioritize Like a Pro",
    description: "The smartest way to organize your tasks using the Eisenhower Matrix.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} theme-transition`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
