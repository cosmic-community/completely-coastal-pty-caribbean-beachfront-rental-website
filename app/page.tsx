import HeroSection from '@/components/HeroSection'
import AboutPreview from '@/components/AboutPreview'
import PropertyPreview from '@/components/PropertyPreview'
import GalleryPreview from '@/components/GalleryPreview'
import DiningPreview from '@/components/DiningPreview'
import ReviewsPreview from '@/components/ReviewsPreview'
import { getHomepage, getGalleryItems } from '@/lib/cosmic'

export default async function HomePage() {
  const homepage = await getHomepage()
  // Fetch gallery items for the photo squares
  const galleryItems = await getGalleryItems()
  const featuredPhotos = galleryItems.slice(0, 6) // Get first 6 photos for the grid

  return (
    <>
      <HeroSection page={homepage} />
      
      {/* Choose Your Space Section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Choose Your Space
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the perfect spots around our beachfront property - from stunning ocean views to cozy interior spaces, 
              each corner offers its own unique Caribbean charm.
            </p>
          </div>

          {/* Photo Grid Layout */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Side - Large Photo (Half Size) */}
              {featuredPhotos[0] && (
                <div className="lg:w-1/2">
                  <div className="photo-square group cursor-pointer h-96">
                    <img
                      src={`${featuredPhotos[0].metadata.image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                      alt={featuredPhotos[0].metadata.caption || featuredPhotos[0].title}
                      className="w-full h-full object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-500 group-hover:bg-opacity-0"></div>
                    {featuredPhotos[0].metadata.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                        <p className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {featuredPhotos[0].metadata.caption}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Right Side - Grid of Smaller Photos */}
              <div className="lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  {/* Top Row - Two Photos */}
                  {featuredPhotos.slice(1, 3).map((item, index) => (
                    <div
                      key={item.id}
                      className="photo-square group cursor-pointer h-44"
                    >
                      <img
                        src={`${item.metadata.image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                        alt={item.metadata.caption || item.title}
                        className="w-full h-full object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-500 group-hover:bg-opacity-0"></div>
                      {item.metadata.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                          <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {item.metadata.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Middle Row - Two Photos */}
                  {featuredPhotos.slice(3, 5).map((item, index) => (
                    <div
                      key={item.id}
                      className="photo-square group cursor-pointer h-44"
                    >
                      <img
                        src={`${item.metadata.image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                        alt={item.metadata.caption || item.title}
                        className="w-full h-full object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-500 group-hover:bg-opacity-0"></div>
                      {item.metadata.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                          <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {item.metadata.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Bottom Row - Single Photo Spanning Two Columns */}
                  {featuredPhotos[5] && (
                    <div className="col-span-2">
                      <div className="photo-square group cursor-pointer h-32">
                        <img
                          src={`${featuredPhotos[5].metadata.image.imgix_url}?w=800&h=300&fit=crop&auto=format,compress`}
                          alt={featuredPhotos[5].metadata.caption || featuredPhotos[5].title}
                          className="w-full h-full object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-500 group-hover:bg-opacity-0"></div>
                        {featuredPhotos[5].metadata.caption && (
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                            <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              {featuredPhotos[5].metadata.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutPreview />
      <PropertyPreview />
      <GalleryPreview />
      <DiningPreview />
      <ReviewsPreview />
    </>
  )
}