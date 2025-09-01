import Link from 'next/link'
import { getGalleryItems } from '@/lib/cosmic'

export default async function GalleryPreview() {
  const galleryItems = await getGalleryItems()

  if (!galleryItems || galleryItems.length === 0) {
    return null
  }

  // Show first 6 items
  const previewItems = galleryItems.slice(0, 6)

  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Photo Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Experience the authentic beauty of our Caribbean property and village life
          </p>
          <Link
            href="/gallery"
            className="btn-secondary"
          >
            View All Photos
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewItems.map((item, index) => {
            const image = item.metadata?.image
            const caption = item.metadata?.caption || item.title
            const category = item.metadata?.category?.value || ''

            if (!image) return null

            return (
              <div key={item.id} className="group relative overflow-hidden rounded-xl caribbean-shadow">
                <img
                  src={`${image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                  alt={caption}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    {category && (
                      <div className="bg-secondary-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-2">
                        {category}
                      </div>
                    )}
                    <h3 className="text-white font-semibold text-sm">
                      {caption}
                    </h3>
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