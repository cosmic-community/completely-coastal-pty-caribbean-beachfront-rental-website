import Link from 'next/link'
import { Page } from '@/types'

export interface HeroSectionProps {
  homepage: Page;
}

export default function HeroSection({ homepage }: HeroSectionProps) {
  const title = homepage.metadata?.title || 'Your Caribbean Beachfront Escape in Panama'
  const content = homepage.metadata?.content || 'Experience authentic Caribbean village life'
  const ctaText = homepage.metadata?.cta_text || 'Book Now on Airbnb'
  const ctaLink = homepage.metadata?.cta_link || '#'
  const heroImage = homepage.metadata?.hero_image

  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center text-white">
      {/* Hero Background Image */}
      {heroImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={`${heroImage.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 container-width text-center px-4">
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        
        {content && (
          <div 
            className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={ctaLink}
            className="btn-primary text-lg px-8 py-4"
            target={ctaLink.startsWith('http') ? '_blank' : undefined}
            rel={ctaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {ctaText}
          </Link>
          
          <Link
            href="/gallery"
            className="btn-secondary text-lg px-8 py-4"
          >
            View Gallery
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}