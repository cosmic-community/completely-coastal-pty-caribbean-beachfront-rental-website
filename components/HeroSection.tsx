'use client'

import { useEffect, useState } from 'react'
import { Page } from '@/types'

interface HeroSectionProps {
  page: Page
}

export default function HeroSection({ page }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const heroImage = page.metadata?.hero_image
  const title = page.metadata?.title || page.title

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {heroImage && (
        <div className="absolute inset-0">
          <img
            src={`${heroImage.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 text-center text-white px-4 transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <h1 className="text-5xl lg:text-7xl font-light mb-8 tracking-wide">
          {title}
        </h1>
        <div className="w-24 h-px bg-white mx-auto"></div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <div className="w-px h-12 bg-white/50 mx-auto animate-pulse"></div>
      </div>
    </section>
  )
}