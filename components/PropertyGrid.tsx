'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { getProperties } from '@/lib/cosmic'
import { Property } from '@/types'

export default function PropertyGrid() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleItems, setVisibleItems] = useState<boolean[]>([])
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchProperties() {
      try {
        const propertiesData = await getProperties()
        setProperties(propertiesData)
        setVisibleItems(new Array(propertiesData.length).fill(false))
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleItems(prev => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.property-item')
      items.forEach(item => observer.observe(item))
    }

    return () => observer.disconnect()
  }, [properties])

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-light tracking-wide text-gray-900 mb-4">
            Choose Your Escape
          </h2>
          <div className="w-24 h-px bg-gray-400 mx-auto"></div>
        </div>

        {/* Properties Grid */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => {
            const heroImage = property.metadata?.hero_image
            const propertyName = property.metadata?.property_name || property.title
            const shortDescription = property.metadata?.short_description
            const capacity = property.metadata?.capacity
            const bedrooms = property.metadata?.bedrooms
            const bathrooms = property.metadata?.bathrooms

            return (
              <Link
                key={property.id}
                href={`/properties/${property.slug}`}
                className={`property-item group block transition-all duration-700 transform ${
                  visibleItems[index] 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-12 opacity-0'
                }`}
                data-index={index}
              >
                <div className="relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {heroImage && (
                      <>
                        {/* Black & White Image */}
                        <img
                          src={`${heroImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress&sat=-100`}
                          alt={propertyName}
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                        />
                        {/* Color Image (shown on hover) */}
                        <img
                          src={`${heroImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                          alt={propertyName}
                          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                      </>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-light mb-2 tracking-wide">
                      {propertyName}
                    </h3>
                    
                    {shortDescription && (
                      <p className="text-white/90 text-sm mb-3 line-clamp-2">
                        {shortDescription}
                      </p>
                    )}

                    {/* Property Details */}
                    <div className="flex items-center gap-4 text-xs text-white/80">
                      {capacity && (
                        <span>{capacity}</span>
                      )}
                      {bedrooms && (
                        <span>{bedrooms} {bedrooms === 1 ? 'bed' : 'beds'}</span>
                      )}
                      {bathrooms && (
                        <span>{bathrooms} {bathrooms === 1 ? 'bath' : 'baths'}</span>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 transition-all duration-500 rounded-lg"></div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}