'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getProperties } from '@/lib/cosmic'
import { Property } from '@/types'

export default function PropertyGrid() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProperties() {
      try {
        const data = await getProperties()
        setProperties(data)
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto"></div>
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🏖️</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Properties coming soon
        </h3>
        <p className="text-gray-600">
          We're preparing our beautiful Caribbean properties for you!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {properties.slice(0, 3).map((property) => {
        const heroImage = property.metadata?.hero_image
        const propertyName = property.metadata?.property_name || property.title
        const shortDescription = property.metadata?.short_description || ''
        const capacity = property.metadata?.capacity || ''
        
        return (
          <Link
            key={property.id}
            href={`/properties/${property.slug}`}
            className="group block"
          >
            <div className="relative overflow-hidden rounded-xl aspect-square caribbean-shadow hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              {heroImage && (
                <img
                  src={`${heroImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                  alt={propertyName}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-500" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="bg-black bg-opacity-50 group-hover:bg-opacity-70 backdrop-blur-sm rounded-lg p-4 transition-all duration-300">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent-200 transition-colors duration-300">
                    {propertyName}
                  </h3>
                  {capacity && (
                    <p className="text-sm opacity-90 mb-2">
                      {capacity}
                    </p>
                  )}
                  {shortDescription && (
                    <p className="text-sm opacity-80 line-clamp-2">
                      {shortDescription}
                    </p>
                  )}
                  
                  {/* Hover indicator */}
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center text-accent-200 text-sm font-medium">
                      <span>View Details</span>
                      <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}