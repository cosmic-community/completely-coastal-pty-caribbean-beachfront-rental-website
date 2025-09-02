interface HeroSectionProps {
  title?: string;
  content?: string;
  heroImage?: {
    url: string;
    imgix_url: string;
  };
  ctaText?: string;
  ctaLink?: string;
}

export default function HeroSection({
  title = "Your Caribbean Beachfront Escape in Panama",
  content = "Experience authentic Caribbean village life on Panama's Costa Abajo de Colón.",
  heroImage,
  ctaText = "Book Now on Airbnb",
  ctaLink = "https://airbnb.com/h/completelycoastalgobea"
}: HeroSectionProps) {
  const backgroundImage = heroImage?.imgix_url || 
    "https://cdn.cosmicjs.com/45dbefd0-87fe-11f0-8049-6174f760f7ab-316f8e6c-d279-4163-8ece-adbae06f3310-jpeg.avif";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${backgroundImage}?w=2000&h=1200&fit=crop&auto=format,compress`}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-width text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        
        {content && (
          <div 
            className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
        
        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-8 py-4"
          >
            {ctaText}
          </a>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white/80"
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