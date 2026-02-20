---
inclusion: auto
---

# GetStay Color Palette

## Brand Colors

The GetStay brand uses a modern, minimal color palette inspired by Gen-Z aesthetics:

### Primary Colors
- **Brand Primary**: `#3932d8` - Main brand blue (vibrant, energetic)
- **Brand Primary Light**: `#b7b4f0` - Light purple/blue (soft, approachable)
- **Brand Dark**: `#010105` - Near black (sophisticated, modern)
- **Brand Light**: `#e7e7e5` - Light gray (clean, minimal)
- **Brand White**: `#fffffd` - Off-white (warm, inviting)

## Usage Guidelines

### CSS Variables
Always use CSS variables instead of hardcoded hex values:

```tsx
// ❌ DON'T
<Button className="bg-[#3932d8] text-white">Login</Button>

// ✅ DO
<Button className="bg-brand-primary text-brand-white">Login</Button>
```

### Available Tailwind Classes

#### Background Colors
- `bg-brand-primary` - Main brand blue
- `bg-brand-primary-light` - Light purple/blue
- `bg-brand-dark` - Near black
- `bg-brand-light` - Light gray
- `bg-brand-white` - Off-white

#### Text Colors
- `text-brand-primary`
- `text-brand-primary-light`
- `text-brand-dark`
- `text-brand-light`
- `text-brand-white`

#### Border Colors
- `border-brand-primary`
- `border-brand-primary-light`
- etc.

### Semantic Colors

Use semantic color names for UI elements:

- `bg-primary` / `text-primary` - Primary actions (uses brand-primary)
- `bg-secondary` / `text-secondary` - Secondary elements
- `bg-accent` / `text-accent` - Accent highlights
- `bg-muted` / `text-muted` - Muted backgrounds
- `text-muted-foreground` - Subtle text

### Color Combinations

#### Light Mode
- Background: `#fffffd` (brand-white)
- Foreground: `#010105` (brand-dark)
- Primary: `#3932d8` (brand-primary)
- Accent: `#b7b4f0` (brand-primary-light)

#### Dark Mode
- Background: `#010105` (brand-dark)
- Foreground: `#fffffd` (brand-white)
- Primary: `#b7b4f0` (brand-primary-light)
- Accent: `#3932d8` (brand-primary)

## Examples

### Button Styles
```tsx
// Primary button
<Button className="bg-brand-primary text-brand-white hover:bg-brand-primary/90">
  Book Now
</Button>

// Secondary button
<Button className="bg-brand-light text-brand-dark hover:bg-brand-light/80">
  Learn More
</Button>
```

### Card Hover Effects
```tsx
<Card className="hover:border-brand-primary/50 hover:shadow-brand-primary/10">
  {/* Card content */}
</Card>
```

### Text Highlights
```tsx
<h2>
  Explore <span className="text-brand-primary">Hostels</span>
</h2>
```

## Accessibility

All color combinations meet WCAG 2.1 AA standards for contrast:
- Brand Primary (#3932d8) on Brand White (#fffffd): 7.8:1 ✓
- Brand Dark (#010105) on Brand White (#fffffd): 21:1 ✓
- Brand Primary Light (#b7b4f0) on Brand Dark (#010105): 8.2:1 ✓

---

**Source**: public/palette.svg, public/palette.png
**Last Updated**: 2026-02-20
