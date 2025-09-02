// app/properties/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPropertyBySlug } from '@/lib/cosmic'
import PropertyDetails from '@/components/PropertyDetails'

interface PropertyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)

  if (!property) {
    return {
      title: 'Property Not Found - Completely Coastal PTY',
    }
  }

  const propertyName = property.metadata?.property_name || property.title
  const shortDescription = property.metadata?.short_description

  return {
    title: `${propertyName} - Completely Coastal PTY`,
    description: shortDescription || `Experience ${propertyName}, a beachfront rental in Costa Abajo de Colón, Panama.`,
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  return <PropertyDetails property={property} />
}