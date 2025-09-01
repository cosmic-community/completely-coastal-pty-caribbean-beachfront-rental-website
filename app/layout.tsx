import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Completely Coastal PTY - Caribbean Beachfront Rental Panama',
  description: 'Authentic Caribbean beachfront rental in Panama\'s Costa Abajo de Colón. Experience village life meets ocean comfort just 2.5 hours from Panama City. Pet-friendly with Starlink Wi-Fi.',
  keywords: 'Caribbean beachfront rental Panama, Costa Abajo de Colón, rural Panama Airbnb, pet-friendly beach house, Starlink Wi-Fi beach rental, authentic Caribbean experience',
  authors: [{ name: 'Completely Coastal PTY' }],
  openGraph: {
    title: 'Completely Coastal PTY - Caribbean Beachfront Escape',
    description: 'Authentic beachfront rental in rural Panama where village life meets the sea',
    type: 'website',
    images: [
      {
        url: 'https://imgix.cosmicjs.com/52df1a80-8728-11f0-822a-71b898000c45-photo-1499793983690-e29da59ef1c2-1756726771652.jpg?w=1200&h=630&fit=crop&auto=format,compress',
        width: 1200,
        height: 630,
        alt: 'Beachfront house in Costa Abajo de Colón, Panama',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Access environment variable on server side
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        {/* Pass bucket slug as prop to client component */}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}