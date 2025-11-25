import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Courier_Prime } from 'next/font/google'
import './globals.css'
import { ThemeProvider, ThemeScript } from '@/components/theme-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const courierPrime = Courier_Prime({
  variable: '--font-courier-prime',
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'TextUtils - Professional Text Transformation Tool',
  description: 'Transform your text with TextUtils - a powerful, modern text manipulation tool featuring case conversion, text cleaning, formatting, and real-time statistics.',
  keywords: [
    'text transformation',
    'case conversion',
    'text utilities',
    'text manipulation',
    'string processing',
    'camelCase converter',
    'snake_case converter',
    'text formatter',
    'text cleaner',
    'online text tools',
    'free text utilities',
    'developer tools',
    'text statistics',
    'word counter',
    'character counter'
  ],
  authors: [{ name: 'ubednama', url: 'https://github.com/ubednama' }],
  creator: 'ubednama',
  publisher: 'TextCraft',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://textutils.dev',
    title: 'TextUtils - Professional Text Transformation Tool',
    description: 'Transform your text with powerful case conversion, cleaning, and formatting tools. Free online text utilities with real-time statistics.',
    siteName: 'TextUtils',
    images: [
      {
        url: '/og-image.png', // Placeholder, user should add this file
        width: 1200,
        height: 630,
        alt: 'TextUtils - Professional Text Transformation Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TextUtils - Professional Text Transformation Tool',
    description: 'Transform your text with powerful case conversion, cleaning, and formatting tools.',
    creator: '@ubednama',
    images: ['/og-image.png'], // Placeholder
  },
  category: 'Technology',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${courierPrime.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
