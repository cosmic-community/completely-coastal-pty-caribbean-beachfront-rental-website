import { getPropertyPage } from '@/lib/cosmic'

export default async function PropertyPreview() {
  const propertyData = await getPropertyPage()

  if (!propertyData) {
    return null
  }

  const title = propertyData.metadata?.title || 'Our Beachfront Property'
  const content = propertyData.metadata?.content || ''
  const heroImage = propertyData.metadata?.hero_image?.imgix_url || ''
  const ctaText = propertyData.metadata?.cta_text || 'See More & Book on Airbnb'
  const ctaLink = propertyData.metadata?.cta_link || 'https://airbnb.com/h/completelycoastalgobea'

  const features = [
    { icon: '🏖️', title: 'Beachfront Location', description: 'Direct access to pristine Caribbean waters' },
    { icon: '🐕', title: 'Pet Friendly', description: 'Bring your furry family members' },
    { icon: '📶', title: 'Starlink Wi-Fi', description: 'Reliable internet for remote work' },
    { icon: '⭐', title: 'Superhost Status', description: 'Excellent reviews and hospitality' },
  ]

  return (
    <section id="property" className="section-padding bg-neutral-50">
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the perfect blend of modern comfort and authentic Caribbean village life
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div>
            {heroImage && (
              <div className="relative rounded-2xl overflow-hidden caribbean-shadow">
                <img
                  src={`${heroImage}?w=800&h=600&fit=crop&auto=format,compress`}
                  alt={title}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <div 
              className="prose prose-lg text-gray-600 mb-8"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4"
            >
              {ctaText}
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}