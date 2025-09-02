import HeroSection from '@/components/HeroSection'
import PropertyPreview from '@/components/PropertyPreview'
import GalleryPreview from '@/components/GalleryPreview'
import DiningPreview from '@/components/DiningPreview'
import AboutPreview from '@/components/AboutPreview'
import ReviewsPreview from '@/components/ReviewsPreview'
import CosmicBadge from '@/components/CosmicBadge'
import { getHomepage } from '@/lib/cosmic'
import { Page } from '@/types'

export default async function HomePage() {
  // Fetch homepage data with proper null handling
  const homepageData: Page | null = await getHomepage()
  
  // If no homepage data found, use default fallback
  const page: Page = homepageData || {
    id: 'homepage-fallback',
    slug: 'homepage',
    title: 'Your Caribbean Beachfront Escape in Panama',
    type: 'pages' as const,
    created_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
    metadata: {
      title: 'Your Caribbean Beachfront Escape in Panama',
      hero_image: {
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&auto=format,compress',
        imgix_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&auto=format,compress'
      },
      content: '<p>Escape to authentic Caribbean village life on Panama\'s Costa Abajo de Colón. Just 2.5 hours from Panama City, discover beachfront comfort where the neighbor\'s chickens roam free and every sunset paints the sky in coral and gold.</p><p>Experience the perfect blend of modern comfort and rural charm at our beachfront property - your gateway to authentic Panama.</p>',
      cta_text: 'Book Now on Airbnb',
      cta_link: 'https://airbnb.com/h/completelycoastalgobea',
      seo_keywords: 'Caribbean beachfront rental Panama, Costa Abajo de Colón, rural Panama Airbnb'
    }
  }

  // Get bucket slug for the cosmic badge
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection page={page} />

      {/* Property Preview */}
      <PropertyPreview />

      {/* Gallery Preview */}
      <GalleryPreview />

      {/* Local Dining Preview */}
      <DiningPreview />

      {/* About Preview */}
      <AboutPreview />

      {/* Reviews Preview */}
      <ReviewsPreview />

      {/* Cosmic Badge */}
      <CosmicBadge bucketSlug={bucketSlug} />
    </div>
  )
}