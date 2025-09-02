import Link from 'next/link'
import { Page } from '@/types'

export interface HeroSectionProps {
  homepage: Page;
}

export default function HeroSection({ homepage }: HeroSectionProps) {
  const heroImage = homepage.metadata?.hero_image?.imgix_url
  const title = homepage.metadata?.title || homepage.title
  const content = homepage.metadata?.content
  const ctaText = homepage.metadata?.cta_text
  const ctaLink = homepage.metadata?.cta_link

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Hero Background Image */}
      {heroImage && (
        <div className="absolute inset-0">
          <img
            src={`${heroImage}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 container-width text-center text-white">
        <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        
        {content && (
          <div 
            className="text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-accent-100"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        {ctaText && ctaLink && (
          <Link
            href={ctaLink}
            className="btn-primary btn-large"
            target={ctaLink.startsWith('http') ? '_blank' : '_self'}
            rel={ctaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {ctaText}
          </Link>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}