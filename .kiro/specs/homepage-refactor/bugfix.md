# Bugfix Requirements Document

## Introduction

The homepage (src/app/page.tsx) currently violates production architecture rules by using hardcoded data instead of fetching from the database, and by embedding layout components (header and footer) directly in the page component instead of extracting them to proper layout components. This creates maintainability issues, prevents data updates from reflecting on the homepage, and violates the component organization principles defined in the production rules.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the homepage renders THEN the system displays a hardcoded static array of 4 hostels instead of fetching real data from MongoDB using the Hostel and HostelProfile models

1.2 WHEN the homepage renders THEN the system includes header markup directly in the page component instead of using a separate layout component at /src/components/layout/header.tsx

1.3 WHEN the homepage renders THEN the system includes footer markup directly in the page component instead of using a separate layout component at /src/components/layout/footer.tsx

1.4 WHEN displaying hostel data THEN the system uses placeholder properties (id, subtitle, capacity) that don't match the actual Hostel and HostelProfile model schemas

### Expected Behavior (Correct)

2.1 WHEN the homepage renders THEN the system SHALL fetch real hostel data from MongoDB by querying the Hostel model and populating with HostelProfile data

2.2 WHEN the homepage renders THEN the system SHALL import and use a Header component from /src/components/layout/header.tsx that contains all header markup and logic

2.3 WHEN the homepage renders THEN the system SHALL import and use a Footer component from /src/components/layout/footer.tsx that contains all footer markup and logic

2.4 WHEN displaying hostel data THEN the system SHALL map the fetched Hostel and HostelProfile data to the card display format using the correct model properties (basicInfo.name, basicInfo.city, propertyDetails.accommodationType, media.photos)

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the homepage renders THEN the system SHALL CONTINUE TO display the same visual design with modern minimal Gen-Z clean aesthetic

3.2 WHEN the homepage renders THEN the system SHALL CONTINUE TO include the promo banner with "GET 20% OFF ON YOUR FIRST BOOKING | USE CODE: GETSTAY20"

3.3 WHEN the homepage renders THEN the system SHALL CONTINUE TO display the hero section with "Explore Hostels in Bhopal" and the "Flat ₹1000 off" offer card

3.4 WHEN the homepage renders THEN the system SHALL CONTINUE TO display hostel cards in a responsive grid (1 column mobile, 2 columns tablet, 4 columns desktop)

3.5 WHEN the homepage renders THEN the system SHALL CONTINUE TO follow the design system rules (no shadows, border-based emphasis, font weight contrast, semantic color variables)

3.6 WHEN the homepage renders THEN the system SHALL CONTINUE TO include proper SEO metadata with title, description, OpenGraph, and Twitter card data

3.7 WHEN users interact with the header search bar, theme toggle, and login button THEN the system SHALL CONTINUE TO display the same UI elements with the same styling

3.8 WHEN users view hostel cards THEN the system SHALL CONTINUE TO see the favorite icon, type badge, location icon, and capacity icon with the same styling
