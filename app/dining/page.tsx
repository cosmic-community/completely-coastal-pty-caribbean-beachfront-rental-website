import { Suspense } from 'react'
import MenuGrid from '@/components/MenuGrid'
import Loading from '@/components/Loading'
import { getGalleryItems } from '@/lib/cosmic'

export const metadata = {
  title: 'Local Dining - Completely Coastal PTY',
  description: 'Authentic Caribbean meals prepared by our local caretaker. Fresh fish, coconut rice, and traditional Panamanian dishes delivered to your beachfront door.',
}

export default async function DiningPage() {
  // Fetch gallery items for the photo squares
  const galleryItems = await getGalleryItems()
  const featuredPhotos = galleryItems.slice(0, 3) // Get first 3 photos

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-accent-700 text-white py-16">
        <div className="container-width">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Local Dining
            </h1>
            <p className="text-xl lg:text-2xl text-accent-100 max-w-3xl mx-auto">
              Experience authentic Caribbean hospitality with traditional meals prepared by our caring neighbor and caretaker
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Taste the Caribbean
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our neighbor and caretaker offers authentic Caribbean meals made with fresh, local ingredients. 
              Pre-order from our menu of local favorites and enjoy true Caribbean hospitality delivered right to your property.
            </p>
            <div className="bg-accent-50 p-6 rounded-lg">
              <p className="text-accent-800 font-medium">
                🍽️ All meals are prepared with care using traditional Caribbean recipes and the freshest local ingredients. 
                Please order in advance to ensure availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Space Section */}
      <section className="section-padding bg-accent-50">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Choose Your Space
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enjoy your authentic Caribbean meals in the perfect setting - whether it's our beachfront terrace, 
              cozy interior, or under the swaying palms.
            </p>
          </div>

          {/* Photo Squares with Hover Effect */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
            {featuredPhotos.map((item, index) => (
              <div
                key={item.id}
                className="photo-square group cursor-pointer"
              >
                <img
                  src={`${item.metadata.image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                  alt={item.metadata.caption || item.title}
                  className="w-full h-full object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-500 group-hover:bg-opacity-0"></div>
                {item.metadata.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {item.metadata.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="section-padding">
        <div className="container-width">
          <Suspense fallback={<Loading />}>
            <MenuGrid />
          </Suspense>
        </div>
      </section>
    </div>
  )
}