import Link from 'next/link'
import { getGalleryItems } from '@/lib/cosmic'

export default async function GalleryPreview() {
  const galleryItems = await getGalleryItems()

  if (!galleryItems || galleryItems.length === 0) {
    return null
  }

  // Filter out the mountain sunset photo and show first 6 items
  const filteredItems = galleryItems.filter(item => item.slug !== 'caribbean-sunset')
  const previewItems = filteredItems.slice(0, 6)

  return (
    <section className="section-padding">
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the beauty of our beachfront property and the authentic Caribbean village experience
          </p>
          <Link
            href="/gallery"
            className="btn-primary"
          >
            View Full Gallery
          </Link>
        </div>

        {/* Gallery Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewItems.map((item, index) => {
            const image = item.metadata?.image
            const caption = item.metadata?.caption || item.title
            const category = item.metadata?.category?.value || ''

            if (!image) return null

            return (
              <div 
                key={item.id} 
                className={`group cursor-pointer ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <div className="relative overflow-hidden rounded-xl caribbean-shadow hover:shadow-xl transition-all duration-300">
                  <img
                    src={`${image.imgix_url}?w=${index === 0 ? '1200' : '600'}&h=${index === 0 ? '800' : '400'}&fit=crop&auto=format,compress`}
                    alt={caption}
                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                      index === 0 ? 'h-96 md:h-full' : 'h-64'
                    }`}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      {category && (
                        <div className="bg-accent-500 text-xs px-2 py-1 rounded-full inline-block mb-2">
                          {category}
                        </div>
                      )}
                      <h3 className="text-lg font-semibold">
                        {caption}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}