import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import GalleryPreview from '@/components/GalleryPreview'
import DiningPreview from '@/components/DiningPreview'
import ReviewsPreview from '@/components/ReviewsPreview'
import Loading from '@/components/Loading'
import { getHomepage } from '@/lib/cosmic'

export default async function HomePage() {
  // Fix TypeScript error by properly handling null case
  const homepage = await getHomepage()
  
  // Return early if homepage data is not available
  if (!homepage) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600">Unable to load homepage content.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section - Now minimalistic with title only */}
      <HeroSection page={homepage} />
      
      {/* Gallery Preview */}
      <Suspense fallback={<Loading />}>
        <GalleryPreview />
      </Suspense>
      
      {/* Dining Preview */}
      <Suspense fallback={<Loading />}>
        <DiningPreview />
      </Suspense>
      
      {/* Reviews Preview */}
      <Suspense fallback={<Loading />}>
        <ReviewsPreview />
      </Suspense>
    </div>
  )
}