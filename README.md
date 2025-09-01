# Completely Coastal PTY - Caribbean Beachfront Rental Website

![App Preview](https://imgix.cosmicjs.com/52df1a80-8728-11f0-822a-71b898000c45-photo-1499793983690-e29da59ef1c2-1756726771652.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A beautiful Next.js website for Completely Coastal PTY, featuring their authentic Caribbean beachfront rental property in Panama's Costa Abajo de Colón. Experience the perfect blend of modern comfort and rural village charm through dynamic content powered by Cosmic CMS.

## ✨ Features

- **Dynamic Hero Section**: Rotating taglines and stunning property photography
- **Interactive Photo Gallery**: Categorized images with lightbox viewing (exterior, interior, beach views, village life)
- **Local Dining Menu**: Authentic Caribbean meal offerings with photos, descriptions, and pricing
- **Guest Reviews**: Star rating system and testimonials from real guests
- **Responsive Design**: Mobile-optimized layout with tropical color scheme
- **SEO Optimized**: Keywords targeting Caribbean rental market in Panama
- **Direct Airbnb Booking**: All CTAs link directly to the property's Airbnb listing
- **Authentic Content**: Real photos and stories from Costa Abajo de Colón village life

<!-- CLONE_PROJECT_BUTTON -->

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a modern, clean, and visually engaging website for a property rental company called Completely Coastal PTY. About the company: We rent beachfront and coastal properties in the Caribbean side of Panama, specifically in Costa Abajo de Colón, about 2.5 hours from Panama City. The location is rural and peaceful — visitors experience authentic village life (sometimes even the neighbor's chickens wander by!). All bookings are managed through Airbnb, so the website should showcase the properties and link directly to Airbnb for reservations. Brand personality: Relaxed, tropical, authentic, welcoming, and local. Focus on tranquility, comfort, and connection to nature, while showing the charm of rural Caribbean village life. Colors: sandy beige, palm green, coral, and darker ocean blue (not crystal-clear turquoise). IMPORTANT: For all imagery (hero, gallery, property), use real photos pulled from our Airbnb listing at airbnb.com/h/completelycoastalgobea. Do not use stock images."

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework with custom Caribbean color palette
- **Cosmic CMS** - Headless CMS for dynamic content management
- **Cosmic SDK** - For seamless API integration
- **Imgix** - Advanced image optimization and transformation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the provided bucket access

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables by creating a `.env.local` file:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📚 Cosmic SDK Examples

### Fetching Pages
```typescript
import { cosmic } from '@/lib/cosmic'

const response = await cosmic.objects.find({
  type: 'pages'
}).props(['id', 'title', 'slug', 'metadata']).depth(1)

const pages = response.objects
```

### Fetching Gallery Items by Category
```typescript
const response = await cosmic.objects.find({
  type: 'gallery-items',
  'metadata.category': 'beach'
}).depth(1)

const beachPhotos = response.objects
```

### Fetching Menu Items with Photos
```typescript
const response = await cosmic.objects.find({
  type: 'menu-items'
}).props(['id', 'title', 'metadata']).depth(1)

const menuItems = response.objects
```

## 🌐 Cosmic CMS Integration

This website uses four main content types from your Cosmic bucket:

- **Pages** (`pages`): Homepage, About Us, and Property information with hero images and CTAs
- **Gallery Items** (`gallery-items`): Categorized photos for different sections
- **Menu Items** (`menu-items`): Local Caribbean dishes with photos, descriptions, and pricing  
- **Reviews** (`reviews`): Guest testimonials with star ratings and dates

All content is dynamically loaded from Cosmic, allowing easy updates to:
- Hero section content and rotating taglines
- Photo galleries and captions
- Menu items and pricing
- Guest reviews and ratings
- SEO keywords and metadata

## 🚀 Deployment Options

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy automatically

### Deploy on Netlify

1. Build the project: `bun run build`
2. Deploy the `out` folder to Netlify
3. Set up environment variables in Netlify dashboard

### Environment Variables for Production

Set these environment variables in your deployment platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key  
- `COSMIC_WRITE_KEY` - Your Cosmic write key (if needed for updates)

The website will automatically use your Caribbean rental content and authentic property photos from the Cosmic bucket.
