// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Page type with proper metadata structure
export interface Page extends CosmicObject {
  type: 'pages';
  metadata: {
    title?: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    content?: string;
    cta_text?: string;
    cta_link?: string;
    seo_keywords?: string;
  };
}

// Property type for the new rental properties
export interface Property extends CosmicObject {
  type: 'properties';
  metadata: {
    property_name?: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    short_description?: string;
    capacity?: string;
    bedrooms?: number;
    bathrooms?: number;
    airbnb_link?: string;
    gallery?: string[] | {
      url: string;
      imgix_url: string;
    }[];
    amenities?: string;
    full_description?: string;
  };
}

// Gallery item type
export interface GalleryItem extends CosmicObject {
  type: 'gallery-items';
  metadata: {
    image: {
      url: string;
      imgix_url: string;
    };
    caption?: string;
    category?: {
      key: string;
      value: string;
    };
  };
}

// Menu item type
export interface MenuItem extends CosmicObject {
  type: 'menu-items';
  metadata: {
    dish_name?: string;
    description?: string;
    price?: string;
    category?: {
      key: string;
      value: string;
    };
    photo?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Review type
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    guest_name?: string;
    review_text?: string;
    rating?: {
      key: string;
      value: string;
    };
    date?: string;
  };
}

// Type literals for select-dropdown values
export type GalleryCategory = 'exterior' | 'interior' | 'beach' | 'village' | 'dining';
export type MenuCategory = 'mains' | 'sides' | 'breakfast' | 'beverages';
export type Rating = '5' | '4' | '3';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip?: number;
}

// Type guards for runtime validation
export function isPage(obj: CosmicObject): obj is Page {
  return obj.type === 'pages';
}

export function isProperty(obj: CosmicObject): obj is Property {
  return obj.type === 'properties';
}

export function isGalleryItem(obj: CosmicObject): obj is GalleryItem {
  return obj.type === 'gallery-items';
}

export function isMenuItem(obj: CosmicObject): obj is MenuItem {
  return obj.type === 'menu-items';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews';
}

// Utility types for common patterns
export type CreatePageData = Omit<Page, 'id' | 'created_at' | 'modified_at'>;
export type CreatePropertyData = Omit<Property, 'id' | 'created_at' | 'modified_at'>;
export type CreateGalleryItemData = Omit<GalleryItem, 'id' | 'created_at' | 'modified_at'>;
export type CreateMenuItemData = Omit<MenuItem, 'id' | 'created_at' | 'modified_at'>;
export type CreateReviewData = Omit<Review, 'id' | 'created_at' | 'modified_at'>;