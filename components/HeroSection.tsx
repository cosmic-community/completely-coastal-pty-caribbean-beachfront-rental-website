import { getHomepage, getGalleryItems } from '@/lib/cosmic'

export default async function HeroSection() {
  const [homepageData, galleryItems] = await Promise.all([
    getHomepage(),
    getGalleryItems()
  ])

  if (!homepageData) {
    return (
      <section className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Completely Coastal PTY</h1>
          <p className="text-xl text-gray-600">Your Caribbean beachfront escape in Panama</p>
        </div>
      </section>
    )
  }

  const heroImage = homepageData.metadata?.hero_image?.imgix_url || ''
  const title = homepageData.metadata?.title || 'Your Caribbean Beachfront Escape in Panama'
  const content = homepageData.metadata?.content || ''
  const ctaText = homepageData.metadata?.cta_text || 'Book Now on Airbnb'
  const ctaLink = homepageData.metadata?.cta_link || 'https://airbnb.com/h/completelycoastalgobea'

  // Rotating taglines
  const taglines = [
    "Your Caribbean beachfront escape in Panama",
    "Where village life meets the sea",
    "Unwind in Costa Abajo de Colón",
    "Beachfront comfort, authentic Caribbean charm"
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${heroImage}?w=2000&h=1200&fit=crop&auto=format,compress`}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-width text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow animate-fade-in">
            {title}
          </h1>
          
          <div 
            className="text-lg md:text-xl lg:text-2xl mb-8 text-shadow animate-fade-in animation-delay-200"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4"
            >
              {ctaText}
            </a>
            <a
              href="#about"
              className="btn-secondary text-lg px-8 py-4"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}