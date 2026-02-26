---
inclusion: auto
---

# GetStay App 1.0 - Production Development Rules

## File & Folder Structure

### App Router Organization
- Group related routes using `(folder-name)` for auth, dashboard, etc.
- Each route has `page.tsx`, optional `layout.tsx`, `loading.tsx`, `error.tsx`
- API routes in `/src/app/api/[endpoint]/route.ts`
- Keep pages lean - extract logic to components

### Component Organization Principles
- **Layout components** (`/components/layout/`): Navbar, footer, sidebar - reused across pages
- **Feature components** (`/components/[feature]/`): Group by feature (hostels, profile, bookings)
- **Shared components** (`/components/shared/`): Reusable business components (search-bar, user-avatar)
- **UI primitives** (`/components/ui/`): shadcn/ui components only
- One component per file, kebab-case naming

### Supporting Directories
- `/src/lib/` - Utilities, API clients, validators, helpers
- `/src/hooks/` - Custom React hooks (use-auth, use-hostels)
- `/src/types/` - TypeScript interfaces and types
- `/src/constants/` - App constants (routes, endpoints, config)
- `/src/services/` - Business logic and API service functions
- `/public/` - Static assets organized by type (images/hostels/, images/banners/)

### Organization Rules
- Feature-based: Group related files by feature, not by type
- Colocation: Keep related components, hooks, and types close together
- Separation: Layout components separate from page-specific components
- Scalability: Structure should support growth without refactoring

## SEO Requirements

### Metadata (Required for ALL pages)
```typescript
export const metadata: Metadata = {
  title: "Page Title | GetStay",
  description: "150-160 character description",
  openGraph: {
    title: "Page Title",
    description: "Description",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://getstay.in/path" },
};
```

### Dynamic Metadata
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  // Fetch data and return metadata
}
```

### Semantic HTML
- Use `<main>`, `<article>`, `<section>`, `<nav>`, `<aside>`, `<header>`, `<footer>`
- Proper heading hierarchy (h1 → h2 → h3)
- One `<h1>` per page
- Alt text for all images
- Aria labels for interactive elements

### Performance
- Use Next.js `<Image>` component with width/height
- Lazy load below-the-fold content
- Implement proper loading states
- Use `loading="lazy"` for images

## Code Quality Standards

### TypeScript
- Strict mode enabled
- No `any` types (use `unknown` if needed)
- Define interfaces for all props and data structures
- Export types from `/src/types/`

### Component Patterns
```typescript
// Preferred pattern
interface ComponentProps {
  title: string;
  onAction: () => void;
}

export function Component({ title, onAction }: ComponentProps) {
  return <div>{title}</div>;
}
```

### Error Handling
- Wrap async operations in try-catch
- Use error boundaries for component errors
- Provide user-friendly error messages
- Log errors for debugging

### Accessibility
- Keyboard navigation support
- Focus management
- ARIA attributes where needed
- Color contrast ratio ≥ 4.5:1
- Screen reader tested

## Performance Rules

### Bundle Size
- Code split by route (automatic with App Router)
- Dynamic imports for heavy components
- Tree-shake unused code
- Analyze bundle with `npm run build`

### Data Fetching
- Use Server Components for data fetching
- Implement proper caching strategies
- Use `revalidate` for ISR
- Parallel data fetching where possible

### Images & Assets
- WebP format preferred
- Responsive images with srcset
- Optimize before upload (max 200KB)
- Use CDN for static assets

## Security

### Environment Variables
- Prefix public vars with `NEXT_PUBLIC_`
- Never commit `.env.local`
- Validate env vars at build time

### API Routes
- Validate all inputs
- Rate limiting on public endpoints
- CSRF protection
- Sanitize user input

## Testing (When Implemented)

### Coverage Requirements
- Unit tests for utilities and hooks
- Integration tests for critical flows
- E2E tests for main user journeys

## Git Workflow

### Commit Messages
- Format: `type(scope): message`
- Types: feat, fix, docs, style, refactor, test, chore

### Branch Naming
- `feature/description`
- `fix/description`
- `refactor/description`

## Deployment Checklist

- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] Build succeeds locally
- [ ] Metadata complete on all pages
- [ ] Images optimized
- [ ] Environment variables configured
- [ ] Error boundaries in place
- [ ] Loading states implemented
- [ ] 404 and error pages styled

## Quick Reference

### Import Order
1. React/Next.js imports
2. Third-party libraries
3. Internal components
4. Internal utilities
5. Types
6. Styles

### Naming Conventions
- Components: PascalCase
- Files: kebab-case
- Functions/variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Types/Interfaces: PascalCase

---

**Version**: 1.0  
**Last Updated**: 2026-02-20  
**Project**: GetStay App
