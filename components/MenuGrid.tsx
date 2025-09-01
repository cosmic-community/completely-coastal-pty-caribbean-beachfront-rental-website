'use client'

import { useState, useEffect } from 'react'
import { getMenuItems } from '@/lib/cosmic'
import { MenuItem } from '@/types'

const categories = [
  { key: 'all', value: 'All Dishes' },
  { key: 'mains', value: 'Main Dishes' },
  { key: 'sides', value: 'Sides' },
  { key: 'breakfast', value: 'Breakfast' },
  { key: 'beverages', value: 'Beverages' },
]

export default function MenuGrid() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMenu() {
      try {
        const menuItems = await getMenuItems()
        setItems(menuItems)
        setFilteredItems(menuItems)
      } catch (error) {
        console.error('Error fetching menu:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [])

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredItems(items)
    } else {
      setFilteredItems(items.filter(item => item.metadata?.category?.key === activeCategory))
    }
  }, [activeCategory, items])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto"></div>
      </div>
    )
  }

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setActiveCategory(category.key)}
            className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
              activeCategory === category.key
                ? 'bg-accent-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.value}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => {
          const dishName = item.metadata?.dish_name || item.title
          const description = item.metadata?.description || ''
          const price = item.metadata?.price || ''
          const photo = item.metadata?.photo
          const category = item.metadata?.category?.value || ''

          return (
            <div key={item.id} className="card hover:shadow-xl transition-all duration-300">
              {photo && (
                <div className="mb-4 -mx-6 -mt-6">
                  <img
                    src={`${photo.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
                    alt={dishName}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                </div>
              )}
              
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900">
                  {dishName}
                </h3>
                {price && (
                  <span className="text-secondary-600 font-bold text-lg">
                    {price}
                  </span>
                )}
              </div>
              
              {category && (
                <div className="bg-accent-100 text-accent-800 text-sm px-3 py-1 rounded-full inline-block mb-4">
                  {category}
                </div>
              )}
              
              {description && (
                <p className="text-gray-600 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No dishes in this category yet
          </h3>
          <p className="text-gray-600">
            Check back soon for more authentic Caribbean options!
          </p>
        </div>
      )}
    </>
  )
}