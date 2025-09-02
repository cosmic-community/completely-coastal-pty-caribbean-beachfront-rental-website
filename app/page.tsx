import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import PropertyGrid from '@/components/PropertyGrid'
import DiningPreview from '@/components/DiningPreview'
import GalleryPreview from '@/components/GalleryPreview'
import ReviewsPreview from '@/components/ReviewsPreview'
import AboutPreview from '@/components/AboutPreview'
import Loading from '@/components/Loading'
import { getHomepage } from '@/lib/cosmic'

export default async function HomePage() {
  const homepage = await getHomepage()

  if (!homepage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600">Unable to load homepage content.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection page={homepage} />
      
      {/* Choose Your Space Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Choose your space
            </h2>
          </div>
          
          {/* Property Grid */}
          <Suspense fallback={<Loading />}>
            <PropertyGrid />
          </Suspense>
        </div>
      </section>

      {/* Other Sections */}
      <Suspense fallback={<Loading />}>
        <DiningPreview />
      </Suspense>
      
      <Suspense fallback={<Loading />}>
        <GalleryPreview />
      </Suspense>
      
      <Suspense fallback={<Loading />}>
        <ReviewsPreview />
      </Suspense>
      
      <Suspense fallback={<Loading />}>
        <AboutPreview />
      </Suspense>
    </div>
  )
}