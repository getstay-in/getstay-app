---
inclusion: auto
---

# GetStay Design System

**Style**: Modern Minimal Gen-Z Clean

## Typography

### Font Pairing
- **Poppins** (sans-serif) - Body, headings, UI elements
- **Space Mono** (monospace) - Logo accent, badges, promo text

### Font Weight Contrast
```tsx
// Large + Thin
<h1 className="text-5xl font-light">Explore</h1>

// Large + Bold
<h1 className="text-5xl font-bold">Hostels</h1>

// Small + Light
<p className="text-sm font-light">Subtitle text</p>

// Small + Bold
<span className="text-xs font-bold uppercase">BOYS</span>
```

### Usage Rules
- Headers: `font-light` base + `font-bold` accent
- Body: `font-light` for readability
- Badges/Labels: `font-bold uppercase` with `font-mono`
- Logo: `font-light` + `font-mono font-bold` accent

## Colors

### Brand Colors
- **Primary**: `bg-brand-primary` / `text-brand-primary` (#3932d8)
- **Accent**: `bg-brand-primary-light` (#b7b4f0)
- **Dark**: `bg-brand-dark` (#010105)
- **Light**: `bg-brand-light` (#e7e7e5)

### Semantic Usage
- Backgrounds: `bg-background` (white/dark)
- Text: `text-foreground` (dark/white)
- Muted: `text-muted-foreground` (subtle text)
- Borders: `border-border` (light gray)

## Styling Principles

### No Shadows
Use borders instead:
```tsx
// ❌ DON'T
<Card className="shadow-lg">

// ✅ DO
<Card className="border border-border hover:border-brand-primary">
```

### Minimal Approach
- Clean spacing with generous padding
- Simple rounded corners (`rounded-lg`, `rounded-xl`)
- Subtle transitions (`transition-colors`, `transition-all`)
- Flat design with border emphasis

### Hover Effects
```tsx
// Border color change
hover:border-brand-primary

// Background transparency
hover:bg-brand-primary/90

// Text color
hover:text-foreground
```

## Component Patterns

### Cards
```tsx
<Card className="rounded-xl border border-border hover:border-brand-primary">
  <div className="h-40 bg-muted"> {/* Compact height */}
    <Badge className="text-xs font-bold uppercase">TYPE</Badge>
  </div>
  <CardContent className="p-4"> {/* Minimal padding */}
    <h3 className="text-base font-bold">Title</h3>
    <p className="text-xs font-light text-muted-foreground">Subtitle</p>
  </CardContent>
</Card>
```

### Buttons
```tsx
// Primary
<Button className="bg-brand-primary text-brand-white hover:bg-brand-primary/90">

// Ghost
<Button variant="ghost" className="hover:bg-transparent">
```

### Inputs
```tsx
<Input className="border border-border bg-muted/30 focus:border-brand-primary" />
```

## Spacing Scale
- Compact: `p-4`, `gap-3`, `mb-2`
- Standard: `p-6`, `gap-6`, `mb-4`
- Generous: `p-12`, `gap-8`, `mb-8`

## Quick Reference

### Do's ✓
- Use font weight contrast (light + bold)
- Use borders for emphasis
- Keep spacing clean and consistent
- Use semantic color variables
- Maintain minimal aesthetic

### Don'ts ✗
- No shadows (use borders)
- No hardcoded hex colors
- No excessive decorations
- No heavy gradients
- No complex animations

---

**Style**: Modern, Minimal, Gen-Z, Clean
