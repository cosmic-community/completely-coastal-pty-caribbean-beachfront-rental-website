import { Suspense } from 'react'
import GalleryGrid from '@/components/GalleryGrid'
import Loading from '@/components/Loading'

export const metadata = {
  title: 'Photo Gallery - Completely Coastal PTY',
  description: 'Explore our authentic Caribbean property photos from Costa Abajo de Colón, Panama. See house exteriors, interiors, beach views, and village life.',
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container-width">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Photo Gallery
            </h1>
            <p className="text-xl lg:text-2xl text-primary-100 max-w-3xl mx-auto">
              Discover the authentic beauty of our Caribbean beachfront property and the charming village life of Costa Abajo de Colón
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-width">
          <Suspense fallback={<Loading />}>
            <GalleryGrid />
          </Suspense>
        </div>
      </section>
    </div>
  )
}