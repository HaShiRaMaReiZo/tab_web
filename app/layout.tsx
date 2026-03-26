import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: 'TAB Book Centre - Online Book Store',
  description: 'Myanmar\'s leading online bookstore. Browse thousands of books, stationery, and more. Easy search by category, author, or book name.',
  keywords: ['books', 'myanmar', 'bookstore', 'TAB Book Centre', 'online shopping'],
}

export const viewport: Viewport = {
  themeColor: '#00a651',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
