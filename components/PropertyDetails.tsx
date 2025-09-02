'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Property } from '@/types'

interface PropertyDetailsProps {
  property: Property
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const propertyName = property.metadata?.property_name || property.title
  const heroImage = property.metadata?.hero_image
  const shortDescription = property.metadata?.short_description
  const capacity = property.metadata?.capacity
  const bedrooms = property.metadata?.bedrooms
  const bathrooms = property.metadata?.bathrooms
  const airbnbLink = property.metadata?.airbnb_link
  const gallery = property.metadata?.gallery || []
  const amenities = property.metadata?.amenities
  const fullDescription = property.metadata?.full_description

  // Combine hero image with gallery for slideshow
  const allImages = [
    ...(heroImage ? [heroImage.imgix_url] : []),
    ...(Array.isArray(gallery) ? gallery : [])
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-end overflow-hidden">
        {/* Image Slideshow */}
        <div className="absolute inset-0">
          {allImages.length > 0 && (
            <>
              <img
                src={`${allImages[currentImageIndex]}?w=2000&h=1200&fit=crop&auto=format,compress`}
                alt={propertyName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </>
          )}
        </div>

        {/* Navigation Dots */}
        {allImages.length > 1 && (
          <div className="absolute bottom-8 right-8 flex gap-2">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-8 left-8 z-20 text-white hover:text-gray-300 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        {/* Content */}
        <div className={`relative z-10 w-full p-8 text-white transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-light mb-4 tracking-wide">
              {propertyName}
            </h1>
            
            {shortDescription && (
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                {shortDescription}
              </p>
            )}

            {/* Property Stats */}
            <div className="flex items-center gap-6 text-sm text-white/80 mb-8">
              {capacity && <span>{capacity}</span>}
              {bedrooms && <span>{bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>}
              {bathrooms && <span>{bathrooms} {bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>}
            </div>

            {/* CTA Button */}
            {airbnbLink && (
              <a
                href={airbnbLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Book on Airbnb
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Amenities */}
            {amenities && (
              <div>
                <h2 className="text-3xl font-light mb-8">What's Included</h2>
                <div className="space-y-2">
                  {amenities.split('\n').map((amenity, index) => (
                    <p key={index} className="text-gray-600 flex items-center">
                      <span className="mr-3">{amenity.split(' ')[0]}</span>
                      <span>{amenity.split(' ').slice(1).join(' ')}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Full Description */}
            {fullDescription && (
              <div>
                <h2 className="text-3xl font-light mb-8">About This Property</h2>
                <div 
                  className="text-gray-600 leading-relaxed prose"
                  dangerouslySetInnerHTML={{ __html: fullDescription }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Auto-advance slideshow */}
      {allImages.length > 1 && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                let currentIndex = 0;
                const images = ${JSON.stringify(allImages)};
                setInterval(() => {
                  currentIndex = (currentIndex + 1) % images.length;
                  const event = new CustomEvent('changeSlide', { detail: currentIndex });
                  document.dispatchEvent(event);
                }, 5000);
                
                document.addEventListener('changeSlide', (e) => {
                  const buttons = document.querySelectorAll('[data-slide-button]');
                  buttons[e.detail]?.click();
                });
              })();
            `
          }}
        />
      )}
    </div>
  )
}