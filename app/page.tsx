import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import AboutPreview from '@/components/AboutPreview'
import PropertyPreview from '@/components/PropertyPreview'
import GalleryPreview from '@/components/GalleryPreview'
import DiningPreview from '@/components/DiningPreview'
import ReviewsPreview from '@/components/ReviewsPreview'
import Loading from '@/components/Loading'

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <HeroSection />
      </Suspense>
      
      <Suspense fallback={<div className="section-padding"><Loading /></div>}>
        <AboutPreview />
      </Suspense>
      
      <Suspense fallback={<div className="section-padding"><Loading /></div>}>
        <PropertyPreview />
      </Suspense>
      
      <Suspense fallback={<div className="section-padding"><Loading /></div>}>
        <GalleryPreview />
      </Suspense>
      
      <Suspense fallback={<div className="section-padding"><Loading /></div>}>
        <DiningPreview />
      </Suspense>
      
      <Suspense fallback={<div className="section-padding"><Loading /></div>}>
        <ReviewsPreview />
      </Suspense>
    </>
  )
}