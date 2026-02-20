# Implementation Plan

- [ ] 1. Write bug condition exploration test
  - **Property 1: Fault Condition** - Hardcoded Data and Embedded Components
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the bug exists
  - **Scoped PBT Approach**: Scope the property to concrete failing cases - hardcoded data array, embedded header/footer
  - Test that page.tsx contains hardcoded `const hostels = [...]` array (confirms bug)
  - Test that page.tsx contains embedded `<header>` JSX instead of imported Header component (confirms bug)
  - Test that page.tsx contains embedded `<footer>` JSX instead of imported Footer component (confirms bug)
  - Test that page.tsx does NOT call `connectDB()` or query Hostel/HostelProfile models (confirms bug)
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found: hardcoded array with 4 static objects, embedded header/footer markup, no database connection
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Visual Design and User Experience
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for visual design and styling
  - Take screenshots at breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop)
  - Document all Tailwind CSS classes used in promo banner, hero section, hostel cards, header, footer
  - Document responsive grid behavior: 1 column mobile, 2 columns tablet, 4 columns desktop
  - Document design system compliance: no shadows, border-based emphasis, font weight contrast
  - Write property-based tests capturing observed visual patterns from Preservation Requirements
  - Test that promo banner text, styling, and background color are preserved
  - Test that hero section layout, text, offer card, and background remain unchanged
  - Test that hostel card grid layout and styling are preserved
  - Test that header and footer styling remain unchanged
  - Test that all Tailwind CSS classes are preserved
  - Test that responsive breakpoints remain unchanged
  - Property-based testing generates many test cases for stronger guarantees
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [ ] 3. Implement homepage refactor with database integration and component extraction

  - [ ] 3.1 Create TypeScript type definitions
    - Create `src/types/hostel.types.ts` file
    - Define `HostelCardData` interface with properties: id, name, location, accommodationType, imageUrl, totalRooms, city
    - Define accommodation type union: 'boys' | 'girls' | 'coed' | 'separate'
    - Export all types for use in components
    - Ensure strict TypeScript compliance (no `any` types)
    - _Bug_Condition: isBugCondition(pageImplementation) where pageImplementation.dataSource == 'hardcoded_array'_
    - _Expected_Behavior: Type definitions enable proper data transformation from MongoDB models to display format_
    - _Preservation: No visual changes - types are internal implementation detail_
    - _Requirements: 2.1, 2.2_

  - [ ] 3.2 Extract Header component
    - Create `src/components/layout/header.tsx` file
    - Extract header JSX from page.tsx (logo, search bar, theme toggle, login button)
    - Maintain all existing Tailwind CSS classes exactly as they are
    - Export as named export `Header`
    - Add TypeScript interface `HeaderProps` (currently no props needed)
    - Import necessary dependencies (Lucide icons, shadcn/ui components)
    - Ensure component is Server Component by default (no 'use client' unless needed)
    - _Bug_Condition: isBugCondition(pageImplementation) where pageImplementation.headerLocation == 'embedded_in_page'_
    - _Expected_Behavior: Header component extracted to separate file and imported in page.tsx_
    - _Preservation: Header visual design, styling, and layout must remain identical_
    - _Requirements: 2.3, 3.1, 3.2, 3.5_

  - [ ] 3.3 Extract Footer component
    - Create `src/components/layout/footer.tsx` file
    - Extract footer JSX from page.tsx (logo, links, copyright)
    - Maintain all existing Tailwind CSS classes exactly as they are
    - Export as named export `Footer`
    - Add TypeScript interface `FooterProps` (currently no props needed)
    - Ensure component is Server Component by default
    - _Bug_Condition: isBugCondition(pageImplementation) where pageImplementation.footerLocation == 'embedded_in_page'_
    - _Expected_Behavior: Footer component extracted to separate file and imported in page.tsx_
    - _Preservation: Footer visual design, styling, and layout must remain identical_
    - _Requirements: 2.3, 3.1, 3.2, 3.5_

  - [ ] 3.4 Implement database integration in page.tsx
    - Convert `Home` function to async: `async function Home()`
    - Import `connectDB` from `@/lib/mongoose/connection`
    - Import Hostel and HostelProfile models
    - Call `await connectDB()` at start of component with try-catch error handling
    - Implement optimized MongoDB query:
      ```typescript
      const hostelProfiles = await HostelProfile
        .find({ 'basicInfo.city': 'Bhopal' })
        .populate('hostel', 'name description')
        .select('basicInfo propertyDetails media.photos')
        .limit(4)
        .lean()
        .exec();
      ```
    - Create `transformHostelProfile` function to map HostelProfile data to HostelCardData
    - Map `basicInfo.name` to name, `basicInfo.city` to location, `propertyDetails.accommodationType` to type
    - Map `media.photos[0].url` to imageUrl with fallback to placeholder
    - Handle errors gracefully with try-catch and fallback to empty array
    - Remove hardcoded `const hostels = [...]` array
    - Replace with transformed database results
    - _Bug_Condition: isBugCondition(pageImplementation) where NOT pageImplementation.usesMongoDBConnection OR NOT pageImplementation.queriesHostelModels_
    - _Expected_Behavior: Page fetches real hostel data from MongoDB using connectDB() and model queries_
    - _Preservation: Visual output must remain identical - same hostel cards, same layout, same styling_
    - _Requirements: 2.1, 2.2, 2.4, 3.3, 3.4_

  - [ ] 3.5 Update page.tsx to use extracted components
    - Import Header from `@/components/layout/header`
    - Import Footer from `@/components/layout/footer`
    - Replace embedded header JSX with `<Header />` component
    - Replace embedded footer JSX with `<Footer />` component
    - Verify component hierarchy: page.tsx → Header, PromoBanner, HeroSection, HostelsSection, Footer
    - Ensure all styling and layout remain unchanged
    - _Bug_Condition: isBugCondition(pageImplementation) where pageImplementation.headerLocation == 'embedded_in_page' OR pageImplementation.footerLocation == 'embedded_in_page'_
    - _Expected_Behavior: Page imports and uses Header and Footer components from layout directory_
    - _Preservation: Visual design must remain identical after component extraction_
    - _Requirements: 2.3, 3.1, 3.2, 3.5_

  - [ ] 3.6 Implement ISR caching configuration
    - Add `export const revalidate = 3600` to page.tsx (revalidate every hour)
    - Add comment explaining caching strategy
    - Verify Next.js 15 ISR configuration is correct
    - _Bug_Condition: Not directly related to bug condition, but required for production_
    - _Expected_Behavior: Page uses ISR to cache and revalidate every hour_
    - _Preservation: No visual changes - caching is performance optimization_
    - _Requirements: 2.4_

  - [ ] 3.7 Implement SEO metadata with generateMetadata
    - Convert static metadata to `generateMetadata` async function
    - Fetch hostel count for dynamic description
    - Generate title: "Explore Hostels in Bhopal | GetStay - Find Your Perfect Stay"
    - Generate description with actual hostel count
    - Add Open Graph metadata: og:title, og:description, og:image, og:type, og:locale, og:site_name
    - Add Twitter Card metadata: twitter:card, twitter:title, twitter:description, twitter:image
    - Add canonical URL: `alternates: { canonical: 'https://getstay.com' }`
    - Add robots meta: "index, follow"
    - Add viewport and theme-color
    - _Bug_Condition: Not directly related to bug condition, but required for production SEO_
    - _Expected_Behavior: Dynamic metadata generated based on actual hostel data_
    - _Preservation: No visual changes - metadata is in HTML head_
    - _Requirements: 2.4_

  - [ ] 3.8 Implement structured data (JSON-LD)
    - Create JSON-LD structured data for ItemList schema
    - Include LocalBusiness schema for each hostel
    - Add to page.tsx as `<script type="application/ld+json">`
    - Include properties: @context, @type, name, description, itemListElement
    - For each hostel: @type: LocalBusiness, name, address, image
    - Validate JSON-LD structure is correct
    - _Bug_Condition: Not directly related to bug condition, but required for production SEO_
    - _Expected_Behavior: Structured data helps search engines understand hostel listings_
    - _Preservation: No visual changes - structured data is in script tag_
    - _Requirements: 2.4_

  - [ ] 3.9 Create error boundary (error.tsx)
    - Create `src/app/error.tsx` file
    - Mark as client component with `'use client'`
    - Accept error and reset props with proper TypeScript types
    - Display user-friendly error message matching design system
    - Include "Try Again" button that calls reset()
    - Use same Tailwind CSS styling as homepage
    - Center content with proper spacing
    - _Bug_Condition: Not directly related to bug condition, but required for production error handling_
    - _Expected_Behavior: Graceful error display if database fails_
    - _Preservation: Error UI matches design system styling_
    - _Requirements: 2.4_

  - [ ] 3.10 Create loading state (loading.tsx)
    - Create `src/app/loading.tsx` file
    - Implement skeleton loading UI matching homepage layout
    - Create skeleton cards for hostel grid (4 cards)
    - Use pulse animation for loading effect
    - Match responsive grid: 1 column mobile, 2 columns tablet, 4 columns desktop
    - Use muted colors for skeleton elements
    - Maintain same spacing and layout as actual content
    - _Bug_Condition: Not directly related to bug condition, but required for production UX_
    - _Expected_Behavior: Skeleton UI displays while data fetches_
    - _Preservation: Loading UI matches homepage layout and design system_
    - _Requirements: 2.4_

  - [ ] 3.11 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Database Integration and Component Extraction
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test from step 1
    - Verify page.tsx NO LONGER contains hardcoded array
    - Verify page.tsx imports and uses Header component from layout directory
    - Verify page.tsx imports and uses Footer component from layout directory
    - Verify page.tsx calls connectDB() and queries HostelProfile model
    - Verify data is fetched from MongoDB and transformed correctly
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ] 3.12 Verify preservation tests still pass
    - **Property 2: Preservation** - Visual Design and User Experience
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - Compare screenshots: original vs fixed at all breakpoints
    - Verify promo banner styling unchanged
    - Verify hero section layout unchanged
    - Verify hostel card grid and styling unchanged
    - Verify header and footer styling unchanged
    - Verify all Tailwind CSS classes preserved
    - Verify responsive behavior unchanged
    - Verify design system compliance maintained
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm all visual tests still pass after fix (no regressions)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [ ] 4. Testing and validation

  - [ ] 4.1 Run TypeScript type checking
    - Run `npm run type-check` or `tsc --noEmit`
    - Verify no TypeScript errors in page.tsx, header.tsx, footer.tsx, hostel.types.ts
    - Ensure strict mode compliance (no `any` types)
    - Fix any type errors found

  - [ ] 4.2 Test database connection and data fetching
    - Start development server with `npm run dev`
    - Verify MongoDB connection succeeds in console logs
    - Verify hostel data is fetched from database
    - Check browser console for any errors
    - Verify hostel cards display with real data from database
    - Test with different database states (empty, partial, full)

  - [ ] 4.3 Test extracted components render correctly
    - Verify Header component renders with logo, search bar, theme toggle, login button
    - Verify Footer component renders with logo, links, copyright
    - Check that all interactive elements work (theme toggle, buttons)
    - Verify no console errors or warnings

  - [ ] 4.4 Visual regression testing
    - Take screenshots at breakpoints: 375px, 768px, 1024px, 1440px
    - Compare with original screenshots from preservation tests
    - Verify pixel-perfect match for all visual elements
    - Check promo banner, hero section, hostel cards, header, footer
    - Verify responsive grid behavior unchanged

  - [ ] 4.5 Test error handling
    - Simulate database connection failure (invalid MONGODB_URI)
    - Verify error boundary displays user-friendly error message
    - Verify "Try Again" button works
    - Test graceful degradation with empty results

  - [ ] 4.6 Test loading states
    - Throttle network in browser DevTools
    - Verify loading.tsx skeleton UI displays while fetching
    - Verify smooth transition from loading to content
    - Check that skeleton matches actual content layout

  - [ ] 4.7 Validate SEO implementation
    - View page source and verify metadata is present
    - Check Open Graph tags with Facebook Sharing Debugger
    - Validate structured data with Google Rich Results Test
    - Verify canonical URL is correct
    - Check meta descriptions are within 150-160 characters
    - Verify all images have proper alt text

  - [ ] 4.8 Performance testing
    - Run Lighthouse audit in Chrome DevTools
    - Verify Performance score > 90
    - Check LCP < 2.5s, FID < 100ms, CLS < 0.1
    - Verify database query time < 100ms
    - Test ISR caching works (check response headers)

  - [ ] 4.9 Accessibility testing
    - Run axe DevTools accessibility scan
    - Verify no critical or serious issues
    - Test keyboard navigation (Tab, Enter, Escape)
    - Verify focus indicators are visible
    - Check color contrast ratios meet WCAG AA
    - Test with screen reader (optional but recommended)

  - [ ] 4.10 Cross-browser testing
    - Test in Chrome, Firefox, Safari, Edge
    - Verify layout and styling consistent across browsers
    - Check that all interactive elements work
    - Verify no browser-specific console errors

- [ ] 5. Checkpoint - Ensure all tests pass
  - Verify all exploration tests pass (bug is fixed)
  - Verify all preservation tests pass (no regressions)
  - Verify all unit and integration tests pass
  - Verify visual regression tests pass
  - Verify SEO validation passes
  - Verify performance metrics meet targets
  - Verify accessibility tests pass
  - Ask the user if any questions arise or if additional testing is needed
