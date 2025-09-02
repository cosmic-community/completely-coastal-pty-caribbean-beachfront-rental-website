import HeroSection from '@/components/HeroSection'
import PropertyPreview from '@/components/PropertyPreview'
import GalleryPreview from '@/components/GalleryPreview'
import ReviewsPreview from '@/components/ReviewsPreview'
import DiningPreview from '@/components/DiningPreview'
import AboutPreview from '@/components/AboutPreview'
import { getHomepage } from '@/lib/cosmic'
import { Page } from '@/types'

export default async function HomePage() {
  const homepage = await getHomepage()

  // Handle case where homepage data might be null
  if (!homepage) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
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
    <>
      <HeroSection page={homepage} />
      <PropertyPreview />
      <GalleryPreview />
      <ReviewsPreview />
      <DiningPreview />
      <AboutPreview />
    </>
  )
}