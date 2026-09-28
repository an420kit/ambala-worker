---
name: Ambala Worker
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#444651'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#904d00'
  on-secondary: '#ffffff'
  secondary-container: '#fe932c'
  on-secondary-container: '#663500'
  tertiary: '#003120'
  on-tertiary: '#ffffff'
  tertiary-container: '#004a32'
  on-tertiary-container: '#4ac08f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-lg:
    fontFamily: Noto Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Noto Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Noto Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Noto Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Noto Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Noto Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.2px
  label-md:
    fontFamily: Noto Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.3px
  label-sm:
    fontFamily: Noto Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.5px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

The design system is engineered for hyperlocal trust, institutional stability, and absolute clarity across varied literacy levels in North India. Bridging daily-wage workers, skilled tradespeople (electricians, masons, carpenters, plumbers), and local households or contractors across Ambala Cantt, Ambala City, and surrounding industrial sectors, the aesthetic rejects superficial tech-startup ornament in favor of a utilitarian, high-contrast, civic-grade interface.

The design movement combines **Utilitarian Functionalism** with **Civic Accessibility**. It borrows the structure and straightforward reliability of essential public utilities: solid high-contrast backgrounds, explicit tactile states, bilingual visual parity, and zero ambiguity in microcopy and iconography. The emotional response must be immediate reassurance, safety, professional formalization, and frictionless access. Touch targets are large and forgiving, visual hierarchies withstand direct sunlight, and affordances mirror physical buttons to build instant trust among first-time digital users.

## Colors

The color palette addresses practical outdoor legibility, institutional credibility, and immediate actionability.

- **Primary (`#1E3A8A`)**: Deep Institutional Navy. Represents formalization, governance, and civic dependability. Used for primary app bars, main CTAs, selected tab indicators, and critical structural elements.
- **Secondary (`#D97706`)**: Energetic Marigold / Mustard Amber. Reflects urgency, vitality, and local commerce. Used for the "Urgent Labour Chowk" broadcast, immediate availability tags, alert highlights, and pending status flags.
- **Tertiary / Action (`#059669`)**: Deep Safety Emerald. Represents verified safety, direct communication, and financial security. Reserved for primary contact channels ("Call Worker", "WhatsApp Connect"), Aadhaar verification badges, and positive work completion states.
- **Neutrals**: Grounded on a daylight-readable scale. Canvas uses `#F8FAFC` (Slate 50), card surfaces utilize pure `#FFFFFF`, structural divides use `#CBD5E1` (Slate 300) for sharp delineation, and primary text sits at `#0F172A` (Slate 900) ensuring an ultra-high contrast ratio exceeding WCAG AAA standards.

Interactive states must avoid subtle opacity changes. Active presses require distinct tonal shifts (e.g., `#1E3A8A` darkening to `#172554`), ensuring instant feedback on lower-tier smartphone displays.

## Typography

Typography prioritizes bilingual parity between English and Hindi (Devanagari script). Noto Sans is deployed across all roles due to its optical balance, robust glyph support, explicit matra rendering, and superior screen legibility across diverse font sizes.

- **Vertical Metrics & Leading**: Devanagari requires generous vertical clearance for conjunct consonants and vowel marks (matras). Line heights are set between 1.35x and 1.5x of font size to prevent overlapping diacritics.
- **Weight Strategy**: Restricted strictly to Regular (400), SemiBold (600), and Bold (700). Light and Thin weights are banned to avoid illegibility in high-ambient-light outdoor conditions.
- **Bilingual Visual Hierarchy**: When Hindi and English are paired (e.g., "Rajesh Kumar / राजेश कुमार"), both scripts must be set at identical visual hierarchy. The English translation or transliteration sits directly beside or below with equal structural weight.

## Layout & Spacing

The layout is built around a mobile-first 4-column fluid grid for mobile handheld devices (< 600px), transitioning to an 8-column layout for tablets and desktop dispatch views.

- **Mobile Viewport**: Primary canvas padding is `margin-mobile` (`1rem` / 16px), ensuring maximum screen real estate for worker listings while keeping content within comfortable one-thumb reach.
- **Touch Boundaries**: Every interactive control (category cards, dial triggers, audio buttons, filters) enforces a strict minimum physical bounding box of `48px x 48px`, decoupled from visual inner padding via touch-target expansions.
- **Rhythm**: Spacing follows a predictable 4px/8px modular base. Dense lists rely on `space-md` (`12px`) internal separation, while standalone sections and modular card groups enforce `space-xl` (`24px`) gaps to maintain clear spatial division for users parsing high volumes of local listings.

## Elevation & Depth

Visual hierarchy is maintained through crisp structural borders complemented by purposeful, low-blur ambient physical shadows. Faint, ethereal elevations are avoided because they blend into bright displays outdoors.

- **Level 0 (Flat Canvas)**: Background `#F8FAFC`. Zero elevation.
- **Level 1 (Listing Cards, Form Blocks)**: Surface `#FFFFFF`, bounded by a continuous `1px` border in `#E2E8F0`, paired with a grounded drop shadow: `0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04)`.
- **Level 2 (Active Cards, Quick Filters, Category Selectors)**: Raised state during interaction or urgency highlights. Border switches to `#CBD5E1` with shadow `0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.06)`.
- **Level 3 (Sticky Action Bars, Floating Call / Audio Buttons, Modal Sheets)**: Solid white background with an immediate elevation barrier: `0 10px 15px -3px rgba(15, 23, 42, 0.12), 0 4px 6px -4px rgba(15, 23, 42, 0.08)`, topped with a `1px` boundary line to cleanly split canvas content from persistent bottom navigations.

## Shapes

The design system uses Roundedness Level 2 (`0.5rem` / `8px` default radius). This creates an approachable, clean, and durable physical profile without feeling toy-like or overly rounded.

- **Standard Elements (`0.5rem` / `8px`)**: Worker cards, primary buttons, input fields, notification banners, and bottom sheets.
- **Enclosed Badges & Quick Filters (`rounded-lg` / `1rem` / `16px`)**: Aadhaar verification status, trade category tags (Plumber / नलसाज), and location flags (Cantt / Sector 7).
- **Floating Action Targets (`9999px` / Full Pill)**: Voice assistance triggers, direct telephone call bubbles, and audio prompt helpers to evoke the feel of handheld communication devices.

## Components

### Buttons
- **Primary Action (Book / Direct Call)**: Solid `#1E3A8A` or Tertiary `#059669` fill, pure white text, 52px height on mobile. Minimum horizontal padding is 20px. Includes a left-aligned high-contrast physical icon (e.g., Telephone receiver, WhatsApp glyph).
- **Urgent Need CTA (Labour Chowk Broadcast)**: Filled `#D97706` with `#FFFFFF` bold typography, alerting users to high-priority requirements.
- **Secondary / Outlined**: Pure white surface, 2px border in `#1E3A8A`, text in `#1E3A8A`.

### Worker & Job Cards
- **Construction**: White surface, 8px radius, Level 1 elevation, 16px internal padding.
- **Layout**: Left-aligned worker avatar (64x64px, rounded-md) with an overlaid green verification tick; center block containing worker name in bold Hindi & English, primary skill badge, daily rate/hourly rate (`₹` highlighted in `#1E3A8A`), and distance from Ambala landmark (e.g., "Near Manav Chowk • 2.4 km"); right-aligned tactile Call button.
- **Verification Strip**: Prominent badge featuring `#059669` fill, shield icon, and bilingual label ("Aadhaar Verified / आधार सत्यापित").

### Chips & Badges
- **Trade Tags**: Pale slate fill (`#F1F5F9`), `#334155` text, 1px `#CBD5E1` border. Active trade tags use `#1E3A8A` background with white text.
- **Urgent / Active Now Badge**: Amber tint (`#FEF3C7`), text `#92400E`, accompanied by a pulsing 8px amber dot.

### Inputs & Voice Assist
- **Search & Filter Inputs**: 52px height, 1.5px solid border in `#CBD5E1`, background `#FFFFFF`. Focus state applies a 2px ring in `#1E3A8A`.
- **Integrated Mic / Audio Playback Trigger**: Every input and worker card features an explicit circular mic or speaker icon (`#1E3A8A` on `#EFF6FF` background) allowing users to listen to worker profiles or speak their requirement in Hindi.

### Lists & Selection Controls
- **Checkboxes & Radios**: 24x24px minimum footprint. Checked state fills with `#1E3A8A` with a crisp white checkmark.
- **Locality Selectors (Ambala Sectors / Cantt / City)**: List items feature a full-width clickable row (minimum 56px height) with bottom border separation (`#E2E8F0`) and right-aligned directional carats.