import Link from 'next/link'
import { getMenuItems } from '@/lib/cosmic'

export default async function DiningPreview() {
  const menuItems = await getMenuItems()

  if (!menuItems || menuItems.length === 0) {
    return null
  }

  // Show first 4 items
  const previewItems = menuItems.slice(0, 4)

  return (
    <section className="section-padding bg-accent-50">
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Local Dining
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Authentic Caribbean meals prepared by our caring neighbor and caretaker, delivered fresh to your door
          </p>
          <Link
            href="/dining"
            className="btn-primary"
          >
            View Full Menu
          </Link>
        </div>

        {/* Menu Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewItems.map((item) => {
            const dishName = item.metadata?.dish_name || item.title
            const description = item.metadata?.description || ''
            const price = item.metadata?.price || ''
            const photo = item.metadata?.photo
            const category = item.metadata?.category?.value || ''

            return (
              <div key={item.id} className="card hover:shadow-lg transition-all duration-300">
                {photo && (
                  <div className="mb-4 -mx-6 -mt-6">
                    <img
                      src={`${photo.imgix_url}?w=400&h=250&fit=crop&auto=format,compress`}
                      alt={dishName}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {dishName}
                  </h3>
                  {price && (
                    <span className="text-secondary-600 font-bold">
                      {price}
                    </span>
                  )}
                </div>
                
                {category && (
                  <div className="bg-accent-100 text-accent-800 text-xs px-2 py-1 rounded-full inline-block mb-3">
                    {category}
                  </div>
                )}
                
                {description && (
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {description}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-white p-8 rounded-xl caribbean-shadow max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Pre-Order Your Meals
            </h3>
            <p className="text-gray-600 mb-6">
              Contact us in advance to arrange authentic Caribbean dining experiences. 
              All meals are prepared fresh with local ingredients and traditional recipes.
            </p>
            <div className="text-accent-700 font-medium">
              🍽️ Advanced ordering recommended for the best selection
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}