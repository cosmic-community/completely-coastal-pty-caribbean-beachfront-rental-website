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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {heroImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={`${heroImage}?w=1920&h=1080&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container-width text-center text-white">
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        
        {content && (
          <div 
            className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
        
        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            className="btn-primary btn-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  )
}