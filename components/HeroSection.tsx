import Link from 'next/link'
import { Page } from '@/types'

interface HeroSectionProps {
  page: Page | null;
}

export default function HeroSection({ page }: HeroSectionProps) {
  // Handle the case where page might be null
  if (!page) {
    // Fallback content when homepage data is not available
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-accent-600 to-secondary-700">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Your Caribbean Beachfront Escape in Panama
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-accent-100 max-w-3xl mx-auto">
            Escape to authentic Caribbean village life on Panama's Costa Abajo de Colón. 
            Experience the perfect blend of modern comfort and rural charm.
          </p>
          <Link
            href="https://airbnb.com/h/completelycoastalgobea"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-8 py-4"
          >
            Book Now on Airbnb
          </Link>
        </div>
      </section>
    )
  }

  const heroImage = page.metadata?.hero_image
  const title = page.metadata?.title || page.title
  const content = page.metadata?.content || ''
  const ctaText = page.metadata?.cta_text || 'Book Now'
  const ctaLink = page.metadata?.cta_link || '#'

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      {heroImage && (
        <div className="absolute inset-0">
          <img
            src={`${heroImage.imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        
        {content && (
          <div 
            className="text-xl lg:text-2xl mb-8 text-accent-100 max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
        
        {ctaLink && (
          <Link
            href={ctaLink}
            target={ctaLink.startsWith('http') ? '_blank' : '_self'}
            rel={ctaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="btn-primary text-lg px-8 py-4"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}