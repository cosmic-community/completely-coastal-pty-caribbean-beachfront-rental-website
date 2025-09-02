import { Suspense } from 'react'
import { getHomepage } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import PropertyGrid from '@/components/PropertyGrid'
import Loading from '@/components/Loading'

export const metadata = {
  title: 'Caribbean Beachfront Escapes - Completely Coastal PTY',
  description: 'Authentic beachfront rentals in Panama. Choose from 3 unique properties in Costa Abajo de Colón.',
}

export default async function HomePage() {
  const homepage = await getHomepage()

  if (!homepage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome</h1>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <HeroSection page={homepage} />
      
      <Suspense fallback={<Loading />}>
        <PropertyGrid />
      </Suspense>
    </div>
  )
}