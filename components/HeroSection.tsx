import Link from 'next/link'
import { Page } from '@/types'

interface HeroSectionProps {
  page: Page
}

export default function HeroSection({ page }: HeroSectionProps) {
  const title = page.metadata?.title || page.title
  const heroImage = page.metadata?.hero_image
  const ctaText = page.metadata?.cta_text || 'Learn More'
  const ctaLink = page.metadata?.cta_link || '#'

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {heroImage && (
        <div className="absolute inset-0">
          <img
            src={`${heroImage.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center text-white container-width px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
          {title}
        </h1>
        
        {/* Simplified description */}
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-100">
          Your Caribbean beachfront escape in Panama
        </p>

        <Link
          href={ctaLink}
          className="btn-primary text-lg px-8 py-4 inline-block"
          target={ctaLink.startsWith('http') ? '_blank' : '_self'}
          rel={ctaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {ctaText}
        </Link>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}