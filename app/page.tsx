import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import PropertyPreview from '@/components/PropertyPreview'
import GalleryPreview from '@/components/GalleryPreview'
import ReviewsPreview from '@/components/ReviewsPreview'
import DiningPreview from '@/components/DiningPreview'
import AboutPreview from '@/components/AboutPreview'
import Loading from '@/components/Loading'
import { getHomepage } from '@/lib/cosmic'

export default async function HomePage() {
  const homepage = await getHomepage()

  if (!homepage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to Completely Coastal PTY
          </h1>
          <p className="text-gray-600">
            Loading homepage content...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        title={homepage.metadata.title}
        content={homepage.metadata.content}
        heroImage={homepage.metadata.hero_image}
        ctaText={homepage.metadata.cta_text}
        ctaLink={homepage.metadata.cta_link}
      />

      {/* Property Preview */}
      <Suspense fallback={<Loading />}>
        <PropertyPreview />
      </Suspense>

      {/* Gallery Preview */}
      <Suspense fallback={<Loading />}>
        <GalleryPreview />
      </Suspense>

      {/* Reviews Preview */}
      <Suspense fallback={<Loading />}>
        <ReviewsPreview />
      </Suspense>

      {/* Dining Preview */}
      <Suspense fallback={<Loading />}>
        <DiningPreview />
      </Suspense>

      {/* About Preview */}
      <Suspense fallback={<Loading />}>
        <AboutPreview />
      </Suspense>
    </div>
  )
}