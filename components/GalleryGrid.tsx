'use client'

import { useState, useEffect } from 'react'
import { getGalleryItems } from '@/lib/cosmic'
import { GalleryItem } from '@/types'

const categories = [
  { key: 'all', value: 'All Photos' },
  { key: 'exterior', value: 'House Exterior' },
  { key: 'interior', value: 'House Interior' },
  { key: 'beach', value: 'Beach & Views' },
  { key: 'village', value: 'Village Life' },
  { key: 'dining', value: 'Local Dining' },
]

export default function GalleryGrid() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGallery() {
      try {
        const galleryItems = await getGalleryItems()
        setItems(galleryItems)
        setFilteredItems(galleryItems)
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
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
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.value}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const image = item.metadata?.image
          const caption = item.metadata?.caption || item.title
          const category = item.metadata?.category?.value || ''

          if (!image) return null

          return (
            <div 
              key={item.id} 
              className="group relative overflow-hidden rounded-xl caribbean-shadow cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
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
                  <h3 className="text-white font-semibold">
                    {caption}
                  </h3>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300"
            >
              ✕
            </button>
            <img
              src={`${selectedImage.metadata?.image?.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
              alt={selectedImage.metadata?.caption || selectedImage.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h3 className="text-white text-xl font-semibold mb-2">
                {selectedImage.metadata?.caption || selectedImage.title}
              </h3>
              {selectedImage.metadata?.category?.value && (
                <span className="bg-secondary-500 text-white text-sm px-3 py-1 rounded-full">
                  {selectedImage.metadata.category.value}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}