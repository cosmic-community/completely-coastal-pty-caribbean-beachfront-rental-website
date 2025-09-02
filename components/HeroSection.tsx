import { Page } from '@/types'

interface HeroSectionProps {
  page: Page
}

export default function HeroSection({ page }: HeroSectionProps) {
  const heroImage = page.metadata?.hero_image
  const title = page.metadata?.title || page.title
  
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      {heroImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={`${heroImage.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt="Caribbean beachfront"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      )}
      
      {/* Content - Minimalistic with title only */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
          {title}
        </h1>
      </div>
    </section>
  )
}