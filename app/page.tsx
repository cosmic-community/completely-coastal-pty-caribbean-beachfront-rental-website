import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import PropertyPreview from '@/components/PropertyPreview'
import GalleryPreview from '@/components/GalleryPreview'
import ReviewsPreview from '@/components/ReviewsPreview'
import DiningPreview from '@/components/DiningPreview'
import AboutPreview from '@/components/AboutPreview'
import Loading from '@/components/Loading'
import { getHomepage } from '@/lib/cosmic'
import { Page } from '@/types'

export default async function HomePage() {
  const homepageData = await getHomepage()

  // If homepage data is not available, provide a default page structure
  const page: Page = homepageData || {
    id: 'default-homepage',
    slug: 'homepage',
    title: 'Your Caribbean Beachfront Escape in Panama',
    type: 'pages',
    created_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
    metadata: {
      title: 'Your Caribbean Beachfront Escape in Panama',
      hero_image: {
        url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=2000&auto=format,compress',
        imgix_url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=2000&auto=format,compress'
      },
      content: 'Escape to authentic Caribbean village life on Panama\'s Costa Abajo de Colón. Just 2.5 hours from Panama City, discover beachfront comfort where the neighbor\'s chickens roam free and every sunset paints the sky in coral and gold.',
      cta_text: 'Book Now on Airbnb',
      cta_link: 'https://airbnb.com/h/completelycoastalgobea',
      seo_keywords: 'Caribbean beachfront rental Panama, Costa Abajo de Colón, rural Panama Airbnb'
    }
  }

  return (
    <main>
      <HeroSection page={page} />
      
      <Suspense fallback={<Loading />}>
        <PropertyPreview />
      </Suspense>
      
      <Suspense fallback={<Loading />}>
        <GalleryPreview />
      </Suspense>
      
      <Suspense fallback={<Loading />}>
        <ReviewsPreview />
      </Suspense>
      
      <Suspense fallback={<Loading />}>
        <DiningPreview />
      </Suspense>
      
      <Suspense fallback={<Loading />}>
        <AboutPreview />
      </Suspense>
    </main>
  )
}