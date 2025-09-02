import { createBucketClient } from '@cosmicjs/sdk'
import { Page, GalleryItem, MenuItem, Review, Property, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all pages
export async function getPages(): Promise<Page[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'pages' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Page[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch pages');
  }
}

// Fetch page by slug
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'pages', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const page = response.object as Page;
    
    if (!page) {
      return null;
    }
    
    return page;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch page');
  }
}

// Fetch all properties
export async function getProperties(): Promise<Property[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'properties' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Property[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch properties');
  }
}

// Fetch property by slug
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'properties', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const property = response.object as Property;
    
    if (!property) {
      return null;
    }
    
    return property;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch property');
  }
}

// Fetch gallery items with optional category filter
export async function getGalleryItems(category?: string): Promise<GalleryItem[]> {
  try {
    const query: Record<string, any> = { type: 'gallery-items' };
    
    if (category) {
      query['metadata.category'] = category;
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as GalleryItem[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch gallery items');
  }
}

// Fetch menu items with optional category filter
export async function getMenuItems(category?: string): Promise<MenuItem[]> {
  try {
    const query: Record<string, any> = { type: 'menu-items' };
    
    if (category) {
      query['metadata.category'] = category;
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as MenuItem[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch menu items');
  }
}

// Fetch all reviews
export async function getReviews(): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Sort by date (newest first)
    const reviews = response.objects as Review[];
    return reviews.sort((a, b) => {
      const dateA = new Date(a.metadata?.date || '').getTime();
      const dateB = new Date(b.metadata?.date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch reviews');
  }
}

// Get homepage data
export async function getHomepage(): Promise<Page | null> {
  return getPageBySlug('homepage');
}

// Get about page data
export async function getAboutPage(): Promise<Page | null> {
  return getPageBySlug('about-us');
}

// Get property page data
export async function getPropertyPage(): Promise<Page | null> {
  return getPageBySlug('our-property');
}