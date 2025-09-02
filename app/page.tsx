import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import GalleryPreview from '@/components/GalleryPreview'
import DiningPreview from '@/components/DiningPreview'
import ReviewsPreview from '@/components/ReviewsPreview'
import Loading from '@/components/Loading'
import { getHomepage } from '@/lib/cosmic'

export default async function Home() {
  // Fetch homepage data with proper error handling
  const homepage = await getHomepage()

  // Handle case where homepage data might be null
  if (!homepage) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Completely Coastal PTY
          </h1>
          <p className="text-lg text-gray-600">
            Your Caribbean Beachfront Escape in Panama
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <Suspense fallback={<Loading />}>
        <HeroSection homepage={homepage} />
      </Suspense>

      {/* Gallery Preview - Moved above Local Dining */}
      <Suspense fallback={<Loading />}>
        <GalleryPreview />
      </Suspense>

      {/* Local Dining Preview */}
      <Suspense fallback={<Loading />}>
        <DiningPreview />
      </Suspense>

      {/* Reviews Section */}
      <Suspense fallback={<Loading />}>
        <ReviewsPreview />
      </Suspense>
    </div>
  )
}