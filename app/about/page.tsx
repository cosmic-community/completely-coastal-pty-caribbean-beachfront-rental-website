import { getAboutPage } from '@/lib/cosmic'

export const metadata = {
  title: 'About Us - Completely Coastal PTY',
  description: 'Learn about Completely Coastal PTY and our authentic Caribbean beachfront rental experience in Panama.',
}

export default async function AboutPage() {
  const aboutPage = await getAboutPage()

  if (!aboutPage) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600">Unable to load about page content.</p>
        </div>
      </div>
    )
  }

  const heroImage = aboutPage.metadata?.hero_image
  const title = aboutPage.metadata?.title || aboutPage.title
  const content = aboutPage.metadata?.content || ''
  const ctaText = aboutPage.metadata?.cta_text
  const ctaLink = aboutPage.metadata?.cta_link

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
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
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            {title}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            
            {ctaText && ctaLink && (
              <div className="text-center mt-12">
                <a
                  href={ctaLink}
                  className="btn-primary"
                  target={ctaLink.startsWith('http') ? '_blank' : undefined}
                  rel={ctaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {ctaText}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}