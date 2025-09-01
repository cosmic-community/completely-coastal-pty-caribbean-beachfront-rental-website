import { getAboutPage } from '@/lib/cosmic'

export default async function AboutPreview() {
  const aboutData = await getAboutPage()

  if (!aboutData) {
    return null
  }

  const title = aboutData.metadata?.title || 'About Completely Coastal PTY'
  const content = aboutData.metadata?.content || ''
  const heroImage = aboutData.metadata?.hero_image?.imgix_url || ''

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            <div 
              className="prose prose-lg text-gray-600 mb-8"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div className="bg-neutral-100 p-6 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">🐓</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Authentic Village Experience</h4>
                  <p className="text-gray-600 text-sm">
                    Yes, the neighbor's chickens might visit - and that's part of the charm!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
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
        </div>
      </div>
    </section>
  )
}