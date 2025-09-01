import { Suspense } from 'react'
import MenuGrid from '@/components/MenuGrid'
import Loading from '@/components/Loading'

export const metadata = {
  title: 'Local Dining - Completely Coastal PTY',
  description: 'Authentic Caribbean meals prepared by our local caretaker. Fresh fish, coconut rice, and traditional Panamanian dishes delivered to your beachfront door.',
}

export default function DiningPage() {
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