import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Courier_Prime } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

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
  metadataBase: new URL('https://text-utils-two-kohl.vercel.app/'),
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
    url: 'https://text-utils-two-kohl.vercel.app/',
    title: 'TextUtils - Professional Text Transformation Tool',
    description: 'Transform your text with TextUtils - a powerful, modern text manipulation tool featuring case conversion, text cleaning, formatting, and real-time statistics.',
    siteName: 'TextUtils',
    images: [
      {
        url: '/og-image.png',
        width: 512,
        height: 512,
        alt: 'TextUtils - Professional Text Transformation Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TextUtils - Professional Text Transformation Tool',
    description: 'Transform your text with powerful case conversion, cleaning, and formatting tools.',
    creator: '@ubednama',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${courierPrime.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
