# Homepage Refactor Bugfix Design

## Overview

The homepage currently violates production architecture rules by using hardcoded data instead of fetching from MongoDB, and by embedding layout components directly in the page component. This design document outlines a production-grade refactor that implements proper SSR data fetching, comprehensive SEO optimization, component extraction, and follows Next.js 15 best practices with Server Components, ISR caching, and proper error handling.

The fix transforms the homepage from a static prototype into a production-ready page that:
- Fetches real hostel data from MongoDB with optimized queries
- Implements comprehensive SEO with dynamic metadata and structured data (JSON-LD)
- Extracts reusable Header and Footer layout components
- Uses Next.js 15 Server Components for optimal performance
- Implements proper error boundaries, loading states, and fallbacks
- Follows TypeScript strict mode and accessibility standards

## Glossary

- **Bug_Condition (C)**: The condition where the homepage uses hardcoded data or embedded layout components instead of proper database fetching and component extraction
- **Property (P)**: The desired behavior where the homepage fetches real data from MongoDB and uses extracted layout components
- **Preservation**: Existing visual design, styling, and user experience that must remain unchanged
- **SSR (Server-Side Rendering)**: Next.js 15 Server Components that fetch data at request time or build time
- **ISR (Incremental Static Regeneration)**: Next.js caching strategy that regenerates pages at specified intervals
- **Hostel Model**: The Mongoose model at `src/lib/mongoose/models/hostel.model.ts` containing core hostel data
- **HostelProfile Model**: The Mongoose model at `src/lib/mongoose/models/hostel-profile.model.ts` containing detailed hostel information (basicInfo, propertyDetails, media, amenities)
- **connectDB**: The database connection utility at `src/lib/mongoose/connection.ts` that manages MongoDB connections
- **Structured Data (JSON-LD)**: Schema.org markup for search engines to understand hostel listings
- **Open Graph**: Social media metadata for rich link previews
- **Canonical URL**: The preferred URL for SEO to avoid duplicate content issues

## Bug Details

### Fault Condition

The bug manifests when the homepage renders with hardcoded data or embedded layout components. The page component is either not connecting to MongoDB, not querying the Hostel and HostelProfile models, or not extracting Header and Footer components to separate files.

**Formal Specification:**
```
FUNCTION isBugCondition(pageImplementation)
  INPUT: pageImplementation of type PageComponent
  OUTPUT: boolean
  
  RETURN pageImplementation.dataSource == 'hardcoded_array'
         OR pageImplementation.headerLocation == 'embedded_in_page'
         OR pageImplementation.footerLocation == 'embedded_in_page'
         OR NOT pageImplementation.usesMongoDBConnection
         OR NOT pageImplementation.queriesHostelModels
END FUNCTION
```

### Examples

- **Hardcoded Data**: The page defines `const hostels = [...]` with 4 static objects instead of fetching from MongoDB
- **Embedded Header**: The `<header>` element with search bar, logo, and login button is defined directly in page.tsx instead of imported from `/src/components/layout/header.tsx`
- **Embedded Footer**: The `<footer>` element with links is defined directly in page.tsx instead of imported from `/src/components/layout/footer.tsx`
- **Schema Mismatch**: Hardcoded data uses properties like `id`, `subtitle`, `capacity` that don't match the actual Hostel/HostelProfile schema fields

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- The visual design with modern minimal Gen-Z clean aesthetic must remain identical
- The promo banner with "GET 20% OFF ON YOUR FIRST BOOKING | USE CODE: GETSTAY20" must display exactly as before
- The hero section with "Explore Hostels in Bhopal" and "Flat ₹1000 off" offer card must maintain the same layout and styling
- Hostel cards must display in the same responsive grid (1 column mobile, 2 columns tablet, 4 columns desktop)
- Design system rules must be followed (no shadows, border-based emphasis, font weight contrast, semantic color variables)
- Header elements (search bar, theme toggle, login button) must maintain the same UI and styling
- Hostel card elements (favorite icon, type badge, location icon, capacity icon) must maintain the same styling
- All Tailwind CSS classes and component styling must remain unchanged

**Scope:**
All visual presentation, styling, and user interface elements should be completely unaffected by this fix. This includes:
- All Tailwind CSS utility classes
- Component structure and HTML semantics
- Color scheme and typography
- Spacing, borders, and layout
- Icon usage and positioning
- Responsive breakpoints

## Hypothesized Root Cause

Based on the bug description and code analysis, the root causes are:

1. **Prototype Development Phase**: The homepage was initially built as a static prototype with hardcoded data to establish the visual design before database integration was implemented

2. **Missing Database Integration**: The page component does not import or use the `connectDB` utility, and does not query the Hostel or HostelProfile models

3. **Component Organization Violation**: The Header and Footer components were not extracted to separate files in `/src/components/layout/` as required by production rules

4. **Schema Mapping Gap**: The hardcoded data structure uses different property names than the actual Mongoose models, indicating the data layer was never connected

## Correctness Properties

Property 1: Fault Condition - Database Integration and Component Extraction

_For any_ homepage render request, the fixed page component SHALL fetch real hostel data from MongoDB by calling connectDB(), querying the Hostel model with populated HostelProfile data, and SHALL import Header and Footer components from `/src/components/layout/` instead of embedding them inline.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

Property 2: Preservation - Visual Design and User Experience

_For any_ homepage render, the fixed implementation SHALL produce exactly the same visual output, styling, layout, and user interface as the original hardcoded version, preserving all Tailwind CSS classes, component structure, responsive behavior, and design system compliance.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8**

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct:

**File 1**: `src/app/page.tsx`

**Function**: `Home` (default export)

**Specific Changes**:
1. **Add Database Connection**: Import `connectDB` from `@/lib/mongoose/connection` and call it at the start of the component
   - Use `await connectDB()` to establish MongoDB connection
   - Wrap in try-catch for error handling

2. **Add Model Imports**: Import Hostel and HostelProfile models
   - `import { Hostel } from '@/lib/mongoose/models/hostel.model'`
   - `import { HostelProfile } from '@/lib/mongoose/models/hostel-profile.model'`

3. **Convert to Async Server Component**: Change function signature to `async function Home()`
   - Next.js 15 Server Components support async/await natively
   - Remove client-side only code if any

4. **Implement Data Fetching**: Replace hardcoded array with MongoDB query
   - Query: `await HostelProfile.find().populate('hostel').limit(4).lean()`
   - Use `.lean()` for performance (returns plain objects instead of Mongoose documents)
   - Implement error handling with try-catch
   - Provide fallback empty array on error

5. **Map Data to Display Format**: Transform HostelProfile data to match card component expectations
   - Map `basicInfo.name` to display name
   - Map `basicInfo.city` to location
   - Map `propertyDetails.accommodationType` to type badge
   - Map `media.photos[0].url` to image (use first photo or fallback)
   - Calculate capacity from `propertyDetails.totalRooms` or use placeholder

6. **Extract Header Component**: Move header JSX to `/src/components/layout/header.tsx`
   - Create new file with Header component
   - Import and use `<Header />` in page.tsx
   - Maintain all existing styling and structure

7. **Extract Footer Component**: Move footer JSX to `/src/components/layout/footer.tsx`
   - Create new file with Footer component
   - Import and use `<Footer />` in page.tsx
   - Maintain all existing styling and structure

8. **Implement ISR Caching**: Add revalidation strategy
   - `export const revalidate = 3600` (revalidate every hour)
   - Balances fresh data with performance

9. **Add Error Boundary**: Create error.tsx for error handling
   - Graceful error display if database fails
   - Maintains user experience during outages

10. **Add Loading State**: Create loading.tsx for suspense boundary
    - Skeleton UI while data fetches
    - Improves perceived performance

**File 2**: `src/components/layout/header.tsx` (NEW)

**Specific Changes**:
1. **Create Header Component**: Extract header markup from page.tsx
   - Include logo, search bar, theme toggle, login button
   - Maintain all Tailwind CSS classes
   - Export as named export `Header`

2. **Add TypeScript Interface**: Define HeaderProps if needed
   - Currently no props required (static header)
   - Prepare for future enhancements (user state, search functionality)

3. **Import Dependencies**: Add necessary imports
   - Lucide icons (Search, Moon, User)
   - shadcn/ui components (Button, Input)
   - Next.js Image if logo becomes image

**File 3**: `src/components/layout/footer.tsx` (NEW)

**Specific Changes**:
1. **Create Footer Component**: Extract footer markup from page.tsx
   - Include logo, links, copyright
   - Maintain all Tailwind CSS classes
   - Export as named export `Footer`

2. **Add TypeScript Interface**: Define FooterProps if needed
   - Currently no props required (static footer)

**File 4**: `src/app/error.tsx` (NEW)

**Specific Changes**:
1. **Create Error Boundary**: Implement Next.js error boundary
   - Must be client component (`'use client'`)
   - Accept error and reset props
   - Display user-friendly error message
   - Provide retry button

2. **Match Design System**: Use same styling as homepage
   - Maintain brand colors and typography
   - Provide helpful error message

**File 5**: `src/app/loading.tsx` (NEW)

**Specific Changes**:
1. **Create Loading UI**: Implement skeleton loading state
   - Match homepage layout structure
   - Use skeleton cards for hostel grid
   - Animate with pulse effect

2. **Match Design System**: Use same spacing and layout
   - Maintain responsive grid
   - Use muted colors for skeletons

**File 6**: `src/types/hostel.types.ts` (NEW)

**Specific Changes**:
1. **Create Display Types**: Define TypeScript interfaces for transformed data
   - `HostelCardData` interface for card display
   - Separate from Mongoose model types
   - Include all properties needed for UI

2. **Export Types**: Make available for components
   - Used in page.tsx for type safety
   - Used in future HostelCard component

### SEO Implementation Strategy

**File 7**: `src/app/page.tsx` - Enhanced Metadata

**Specific Changes**:
1. **Dynamic Metadata Generation**: Convert static metadata to `generateMetadata` function
   - Fetch hostel count for dynamic description
   - Include city-specific keywords
   - Generate based on actual data

2. **Structured Data (JSON-LD)**: Add Schema.org markup
   - ItemList schema for hostel collection
   - LocalBusiness schema for each hostel
   - Embedded in page as `<script type="application/ld+json">`

3. **Open Graph Optimization**: Enhanced social media metadata
   - Dynamic og:image based on featured hostel
   - og:type = "website"
   - og:locale = "en_IN"
   - og:site_name = "GetStay"

4. **Twitter Card**: Optimized Twitter metadata
   - twitter:card = "summary_large_image"
   - twitter:site = "@getstay" (if available)
   - Dynamic twitter:image

5. **Canonical URL**: Add canonical link
   - `alternates: { canonical: 'https://getstay.com' }`
   - Prevents duplicate content issues

6. **Additional Meta Tags**: 
   - robots: "index, follow"
   - viewport: "width=device-width, initial-scale=1"
   - theme-color: brand primary color

### Database Query Optimization

**Query Strategy**:
```typescript
// Optimized query with lean() for performance
const hostelProfiles = await HostelProfile
  .find({ 'basicInfo.city': 'Bhopal' }) // Filter by city
  .populate('hostel', 'name description') // Only populate needed fields
  .select('basicInfo propertyDetails media.photos') // Select only needed fields
  .limit(4) // Limit results for homepage
  .lean() // Return plain objects (faster)
  .exec();
```

**Performance Optimizations**:
- Use `.lean()` to return plain JavaScript objects instead of Mongoose documents (10x faster)
- Use `.select()` to fetch only required fields (reduces data transfer)
- Use `.populate()` with field selection to avoid over-fetching
- Add database indexes on `basicInfo.city` for faster queries
- Implement ISR caching to reduce database load

### Component Architecture

**Component Hierarchy**:
```
page.tsx (Server Component)
├── Header (Client Component - interactive elements)
│   ├── Logo
│   ├── SearchBar (future: client component for interactivity)
│   ├── ThemeToggle (client component)
│   └── LoginButton
├── PromoBanner (Server Component)
├── HeroSection (Server Component)
├── HostelsSection (Server Component)
│   └── HostelCard[] (Server Component - can be extracted later)
└── Footer (Server Component)
```

**Server vs Client Components**:
- **Server Components** (default): Header structure, Footer, HostelCard, sections
- **Client Components** (when needed): ThemeToggle, SearchBar (future), interactive buttons
- Principle: Use Server Components by default, only add 'use client' when needed for interactivity

### Caching Strategy

**ISR Configuration**:
```typescript
// In page.tsx
export const revalidate = 3600; // Revalidate every 1 hour

// Alternative: On-demand revalidation
// Use revalidatePath('/') when hostel data changes
```

**Cache Layers**:
1. **Next.js Data Cache**: Automatic caching of fetch requests
2. **ISR**: Page regeneration every hour
3. **CDN Cache**: Vercel Edge Network caching
4. **Database Connection Pool**: Reuse MongoDB connections

**Cache Invalidation**:
- Time-based: Revalidate every hour
- On-demand: Trigger revalidation when hostel data updates (future webhook)
- Manual: Admin dashboard to clear cache (future feature)

### Error Handling Strategy

**Error Boundaries**:
```typescript
// error.tsx - Catches runtime errors
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-6 py-20 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-6">
        We're having trouble loading hostels. Please try again.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
```

**Database Error Handling**:
```typescript
try {
  await connectDB();
  const hostelProfiles = await HostelProfile.find()...;
} catch (error) {
  console.error('Database error:', error);
  // Return empty array as fallback
  // Error boundary will catch and display error UI
  return [];
}
```

**Graceful Degradation**:
- If database fails, show error boundary with retry option
- If no hostels found, show empty state with helpful message
- If images fail to load, show placeholder with hostel icon

### TypeScript Strict Mode Compliance

**Type Definitions**:
```typescript
// src/types/hostel.types.ts
export interface HostelCardData {
  id: string;
  name: string;
  location: string;
  accommodationType: 'boys' | 'girls' | 'coed' | 'separate';
  imageUrl: string;
  totalRooms: number;
  city: string;
}

// Transform function with strict types
function transformHostelProfile(profile: IHostelProfile): HostelCardData {
  return {
    id: profile._id.toString(),
    name: profile.basicInfo.name,
    location: `${profile.basicInfo.city}, ${profile.basicInfo.landmark}`,
    accommodationType: profile.propertyDetails.accommodationType,
    imageUrl: profile.media.photos[0]?.url || '/placeholder-hostel.jpg',
    totalRooms: profile.propertyDetails.totalRooms,
    city: profile.basicInfo.city,
  };
}
```

**No `any` Types**:
- All function parameters and return types explicitly defined
- Use `unknown` for error types, then narrow with type guards
- Mongoose model types imported and used correctly

### Performance Optimization

**Image Optimization**:
```typescript
<Image
  src={hostel.imageUrl}
  alt={hostel.name}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
  priority={index < 2} // Priority load first 2 images
/>
```

**Lazy Loading**:
- Images below fold use `loading="lazy"` (Next.js default)
- Hero banner uses `priority` for LCP optimization
- Defer non-critical JavaScript

**Bundle Optimization**:
- Server Components reduce client-side JavaScript
- Dynamic imports for heavy client components (future)
- Tree-shaking removes unused code

### Accessibility Compliance

**Semantic HTML**:
- `<main>` for main content
- `<header>` and `<footer>` for layout
- `<nav>` for navigation
- `<article>` for hostel cards
- Proper heading hierarchy (h1 → h2 → h3)

**ARIA Labels**:
```typescript
<button aria-label="Toggle theme">
  <Moon className="h-4 w-4" />
</button>

<button aria-label="Add to favorites">
  <Heart className="h-4 w-4" />
</button>
```

**Keyboard Navigation**:
- All interactive elements focusable
- Visible focus indicators
- Logical tab order

**Color Contrast**:
- All text meets WCAG AA standards (4.5:1 ratio)
- Design system already compliant

### Security Best Practices

**Input Validation**:
- Validate environment variables at startup
- Sanitize database query parameters (Mongoose handles this)
- Validate user input in search (future feature)

**Database Security**:
- Use connection pooling to prevent exhaustion
- Implement query timeouts
- Use `.lean()` to prevent prototype pollution
- Never expose sensitive data in client components

**Environment Variables**:
```typescript
// Validate at build time
if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is required');
}

// Never expose in client components
// Server Components can safely use process.env
```

### Logging and Monitoring

**Server-Side Logging**:
```typescript
// In page.tsx
console.log('[Homepage] Fetching hostels from database');
console.log(`[Homepage] Found ${hostels.length} hostels`);

// In connectDB
console.log('MongoDB connected successfully');
console.error('MongoDB connection error:', error);
```

**Error Tracking Hooks**:
```typescript
// Future: Add Sentry or similar
if (error) {
  // Log to monitoring service
  console.error('[Homepage Error]', {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
  });
}
```

**Performance Monitoring**:
- Next.js built-in Web Vitals tracking
- Monitor database query times
- Track ISR revalidation frequency

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, verify the bug exists in the current implementation (hardcoded data, embedded components), then verify the fix correctly fetches from database and uses extracted components while preserving all visual design.

### Exploratory Fault Condition Checking

**Goal**: Confirm the bug exists in the current implementation BEFORE implementing the fix. Verify that the page uses hardcoded data and embedded components.

**Test Plan**: Inspect the current page.tsx implementation and verify it contains hardcoded data array, embedded header markup, and embedded footer markup. Run the page and confirm no database connection is made.

**Test Cases**:
1. **Hardcoded Data Test**: Verify `const hostels = [...]` array exists in page.tsx (will confirm bug)
2. **Embedded Header Test**: Verify `<header>` JSX is defined directly in page.tsx (will confirm bug)
3. **Embedded Footer Test**: Verify `<footer>` JSX is defined directly in page.tsx (will confirm bug)
4. **No Database Connection Test**: Verify no `connectDB()` call or model imports exist (will confirm bug)

**Expected Counterexamples**:
- Hardcoded array with 4 static hostel objects found in page.tsx
- Header and footer markup embedded directly in page component
- No database connection or model queries present
- Possible causes: prototype development phase, missing database integration, component organization violation

### Fix Checking

**Goal**: Verify that after the fix, the page correctly fetches data from MongoDB and uses extracted layout components.

**Pseudocode:**
```
FOR ALL homepage render requests DO
  result := renderHomepage_fixed()
  ASSERT result.dataSource == 'mongodb'
  ASSERT result.usesHeaderComponent == true
  ASSERT result.usesFooterComponent == true
  ASSERT result.hostelData.length > 0
  ASSERT result.hostelData[0].hasProperty('basicInfo')
  ASSERT result.hostelData[0].hasProperty('propertyDetails')
END FOR
```

**Test Cases**:
1. **Database Connection Test**: Verify `connectDB()` is called and succeeds
2. **Model Query Test**: Verify HostelProfile.find() is called with correct parameters
3. **Data Transformation Test**: Verify fetched data is correctly mapped to display format
4. **Header Component Test**: Verify Header is imported from `/src/components/layout/header.tsx`
5. **Footer Component Test**: Verify Footer is imported from `/src/components/layout/footer.tsx`
6. **ISR Caching Test**: Verify `export const revalidate = 3600` is present
7. **Error Handling Test**: Verify try-catch blocks handle database errors gracefully

### Preservation Checking

**Goal**: Verify that the visual design, styling, and user experience remain exactly the same after the fix.

**Pseudocode:**
```
FOR ALL visual elements WHERE NOT affected_by_data_source DO
  ASSERT renderHomepage_original(element) == renderHomepage_fixed(element)
END FOR
```

**Testing Approach**: Visual regression testing is recommended because:
- It automatically detects any unintended visual changes
- It validates that all Tailwind CSS classes are preserved
- It ensures responsive behavior remains unchanged
- It catches subtle styling differences that manual testing might miss

**Test Plan**: Take screenshots of the original homepage at multiple breakpoints, then compare with fixed version pixel-by-pixel.

**Test Cases**:
1. **Promo Banner Preservation**: Verify banner text, styling, and background color unchanged
2. **Hero Section Preservation**: Verify hero layout, text, offer card, and background image unchanged
3. **Hostel Card Grid Preservation**: Verify grid layout, card styling, and responsive breakpoints unchanged
4. **Header Styling Preservation**: Verify header height, logo, search bar, and button styling unchanged
5. **Footer Styling Preservation**: Verify footer layout, links, and copyright text unchanged
6. **Design System Compliance**: Verify no shadows added, borders maintained, font weights preserved
7. **Responsive Behavior**: Verify mobile (1 col), tablet (2 col), desktop (4 col) grid unchanged
8. **Interactive Elements**: Verify hover states, focus states, and transitions unchanged

### Unit Tests

- Test `transformHostelProfile` function with various HostelProfile inputs
- Test data fetching with mocked MongoDB connection
- Test error handling with simulated database failures
- Test Header component renders correctly with all elements
- Test Footer component renders correctly with all elements
- Test metadata generation with different data inputs

### Property-Based Tests

- Generate random HostelProfile data and verify transformation always produces valid HostelCardData
- Generate random database states (empty, partial, full) and verify page handles all cases gracefully
- Test that all accommodation types ('boys', 'girls', 'coed', 'separate') render correctly
- Verify that missing images always fall back to placeholder

### Integration Tests

- Test full page render with real database connection (test environment)
- Test ISR revalidation triggers correctly after time interval
- Test error boundary catches and displays database errors
- Test loading state displays while data fetches
- Test SEO metadata is correctly generated and included in HTML
- Test structured data (JSON-LD) is valid and parseable

### Visual Regression Tests

- Capture screenshots at breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop), 1440px (large desktop)
- Compare original vs fixed implementation pixel-by-pixel
- Verify color values, spacing, typography, and layout match exactly
- Test with different data sets (0 hostels, 1 hostel, 4 hostels, 10+ hostels)

### SEO Validation Tests

- Validate structured data with Google Rich Results Test
- Verify Open Graph tags with Facebook Sharing Debugger
- Test Twitter Card with Twitter Card Validator
- Check canonical URLs are correct
- Verify meta descriptions are within 150-160 characters
- Test that all images have proper alt text

### Performance Tests

- Measure Time to First Byte (TTFB) < 600ms
- Measure Largest Contentful Paint (LCP) < 2.5s
- Measure First Input Delay (FID) < 100ms
- Measure Cumulative Layout Shift (CLS) < 0.1
- Verify database query time < 100ms
- Test ISR cache hit rate > 95%

### Accessibility Tests

- Run axe-core automated accessibility testing
- Verify keyboard navigation works for all interactive elements
- Test with screen reader (NVDA or JAWS)
- Verify color contrast ratios meet WCAG AA standards
- Test focus indicators are visible
- Verify semantic HTML structure with HTML validator

### Security Tests

- Verify environment variables are not exposed in client bundle
- Test database connection handles malformed connection strings
- Verify no sensitive data is logged to console in production
- Test rate limiting on API routes (future)
- Verify input sanitization for search queries (future)
