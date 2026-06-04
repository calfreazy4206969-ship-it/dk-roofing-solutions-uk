# DK Roofing Solutions — Site Upgrade Design Spec
Date: 2026-06-04

## Goal
Upgrade the existing homepage to look more professional and roofing-specific. Use real job photos, verified business details only, and a clean modern design system.

## Design System

**Typography**
- Headings, eyebrows, CTAs: Oswald (700 weight), uppercase where appropriate
- Body, labels, form fields: Inter (400/600)
- Load via Google Fonts: `Oswald:wght@600;700` + `Inter:wght@400;600`

**Colour palette** (unchanged — already strong)
- `--brand: #16324f` — deep navy
- `--accent: #ff6a2b` — orange CTAs
- `--accent-dk: #e2541a`
- `--ok: #1f9d55` — green (call button)
- `--emergency: #cc2200` — emergency banner red

**Direction:** Clean & Modern — full-width photo hero, white section backgrounds, structured trust bar below hero.

## Verified Business Details (use only these)
- **Name:** DK Roofing Solutions
- **Phone:** 07887 479143
- **Address:** 37 Highters Rd, Birmingham B14
- **Contact:** Dennis
- **Services:** flat roofing, pitched roofing, repairs, emergency call-out

**Removed (unverified):** founding year, review count, "30+ years experience", "60-min response", star rating count.

## Real Photos
Save to `/images/` before launch:
- `before-house-1.jpg` — house before re-roof (skip outside)
- `during-stripped-1.jpg` — stripped battens
- `during-tiles-1.jpg` — Dennis laying tiles
- `after-house-1.jpg` — finished house (brown brick)
- `work-scaffold-1.jpg` — scaffolding shot
- `work-slate-1.jpg` — slate close-up
- `work-tiles-2.jpg` — tiles being laid

## Page Sections (top to bottom)

### 1. Emergency Banner (NEW)
- Red bar (`--emergency`) pinned above nav
- Copy: "⚡ ROOF LEAKING? 24/7 Emergency Roofing — Birmingham & West Midlands | Call 07887 479143"
- Right side: white "CALL NOW" button → `tel:+447887479143`

### 2. Header
- Logo: Oswald font — "DK**Roofing**" (accent colour on Roofing)
- Nav links unchanged
- Sticky, white background, subtle shadow

### 3. Hero
- Full-width photo background (existing Unsplash URL, swap for real photo later)
- Dark overlay `rgba(22,50,79,.82)`
- Eyebrow: Oswald, uppercase, orange — "Birmingham Roofers — Flat & Pitched Specialists"
- H1: Oswald 700, uppercase, white — "Roof Repairs & New Roofs You Can Trust"
- Subheading: Inter, softer copy — no unverified claims
- Two CTAs: "Get Free Quote" (orange) + "📞 07887 479143" (ghost)
- Trust pills: "★★★★★ Google Reviews" · "✓ Fully Insured" · "✓ Free Quotes"

### 4. Accreditations Bar (NEW)
- White bar, centred flex layout
- Badges: Checkatrade · Trustmark · NFRC Member · Fully Insured · Free Quotes
- Note: only show badges DK is actually registered with — placeholder all for now, client to confirm

### 5. Services Cards
- 6 cards unchanged in structure
- Replace all emoji icons with inline SVG roofing icons (roof, flat roof, new roof, emergency, gutter, commercial)
- Card headings: Oswald font
- Hover: lift + orange border (existing behaviour, kept)

### 6. Rotating Photo Carousel (NEW)
- Full-width, ~360px tall
- Auto-scrolls through all 7 real job photos
- Loops continuously, pauses on hover
- Left/right arrow controls
- Caption overlay on each photo (job type + area)
- Pure CSS/JS — no external library

### 7. Before & After Gallery (NEW)
- Drag-divider slider using `before-house-1.jpg` / `after-house-1.jpg`
- Caption: "Full Re-Roof — Birmingham B14"
- 2 additional static before/after pairs using remaining photos
- Section heading: "See the Difference"

### 8. Why Us + Quote Estimator
- Existing content kept
- Typography upgraded to Oswald/Inter
- "Why" items: left accent border style kept

### 9. How It Works (Process)
- Existing 4 steps kept
- Step number circles: accent colour, Oswald font
- Minor copy tweak: remove "60-minute" claim

### 10. Customer Reviews
- Existing 3 placeholder reviews kept
- Typography upgrade
- Note in README: replace with real Google reviews before launch

### 11. FAQ Section (NEW)
- 6 questions with accordion expand/collapse
- JSON-LD FAQ schema injected in `<head>` for Google rich results
- Questions:
  1. How much does a roof repair cost in Birmingham?
  2. How long does a full re-roof take?
  3. Do I need planning permission for a new roof?
  4. What's the difference between felt and EPDM flat roofing?
  5. Can you repair a roof in winter?
  6. Are DK Roofing fully insured?

### 12. Areas
- Existing area pills kept
- Minor style: pills get subtle hover improvement

### 13. Free Quote Form + CTA
- Existing form kept
- Typography upgrade
- CTA section dark gradient background kept

### 14. Footer
- Oswald headings on each column
- Same links and content
- Remove unverified claims from footer copy

## Technical Changes
- Add Google Fonts `<link>` to `<head>` in index.html
- Update all `font-family` references in CSS to use Oswald/Inter
- Add `/images/` folder (placeholder until real photos saved)
- Add FAQ JSON-LD schema block
- New CSS sections: emergency banner, accreditations bar, carousel, before/after slider, FAQ accordion
- All existing responsive breakpoints preserved

## Out of Scope
- Service sub-pages (separate task)
- Area sub-pages (separate task)
- AI chat backend wiring (separate task)
- Vercel deployment (separate task)
