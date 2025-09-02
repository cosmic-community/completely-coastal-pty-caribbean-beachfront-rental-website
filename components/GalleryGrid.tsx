'use client'

import { useState, useEffect } from 'react'
import { getGalleryItems } from '@/lib/cosmic'
import { GalleryItem } from '@/types'

const categories = [
  { key: 'all', value: 'All Photos' },
  { key: 'exterior', value: 'House Exterior' },
  { key: 'interior', value: 'Interior' },
  { key: 'beach', value: 'Beach & Views' },
  { key: 'village', value: 'Village Life' },
  { key: 'dining', value: 'Dining' },
]

export default function GalleryGrid() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGallery() {
      try {
        const galleryItems = await getGalleryItems()
        
        // Filter out the mountain/sunset photo that has mountains in it
        const filteredGalleryItems = galleryItems.filter(item => 
          item.slug !== 'caribbean-sunset' // Remove the mountain sunset photo
        )
        
        setItems(filteredGalleryItems)
        setFilteredItems(filteredGalleryItems)
      } catch (error) {
        console.error('Error fetching gallery:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
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

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => {
          const image = item.metadata?.image
          const caption = item.metadata?.caption || item.title
          const category = item.metadata?.category?.value || ''

          if (!image) return null

          return (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl caribbean-shadow hover:shadow-xl transition-all duration-300">
                <img
                  src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                  alt={caption}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
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

      {/* Empty State */}
      {filteredItems.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📸</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No photos in this category yet
          </h3>
          <p className="text-gray-600">
            Check back soon for more beautiful Caribbean memories!
          </p>
        </div>
      )}
    </>
  )
}