import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import PropertyGrid from '@/components/PropertyGrid'
import DiningPreview from '@/components/DiningPreview'
import GalleryPreview from '@/components/GalleryPreview'
import ReviewsPreview from '@/components/ReviewsPreview'
import Loading from '@/components/Loading'
import { getHomepage } from '@/lib/cosmic'

export const metadata = {
  title: 'Completely Coastal PTY - Caribbean Beachfront Rentals in Panama',
  description: 'Escape to authentic Caribbean village life on Panama\'s Costa Abajo de Colón. Beachfront rentals where modern comfort meets rural charm.',
}

export default async function HomePage() {
  const page = await getHomepage()

  return (
    <div className="min-h-screen">
      {page && <HeroSection page={page} />}
      
      {/* Choose Your Space Section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Choose your space
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three unique Caribbean properties, each offering its own slice of paradise
            </p>
          </div>
          
          <div className="fade-in-up stagger-children">
            <Suspense fallback={<Loading />}>
              <PropertyGrid />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Other sections with staggered animations */}
      <div className="fade-in-up">
        <Suspense fallback={<Loading />}>
          <DiningPreview />
        </Suspense>
      </div>

      <div className="fade-in-up">
        <Suspense fallback={<Loading />}>
          <GalleryPreview />
        </Suspense>
      </div>

      <div className="fade-in-up">
        <Suspense fallback={<Loading />}>
          <ReviewsPreview />
        </Suspense>
      </div>
    </div>
  )
}