---
name: HomeLuz
description: "Sistema de controle de ponto eletrônico"
colors:
  brand-navy: "#000666"
  primary-container: "#1a237e"
  primary: "#000666"
  gold-accent: "#d4af37"
  gold-dark: "#b08d2c"
  surface-bright: "#f8f9fa"
  surface: "#edeeef"
  surface-container-high: "#e7e8e9"
  surface-container-lowest: "#ffffff"
  on-surface: "#191c1d"
  on-primary: "#ffffff"
  interactive-blue: "#3b82f6"
  border-light: "#ebebeb"
  text-muted: "#727272"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(1.75rem, 5vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.1
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(1.25rem, 3vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.01em"
rounded:
  pill: "32px"
  container: "16px"
  panel: "24px"
  sm: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.interactive-blue}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "#2563eb"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  card-default:
    backgroundColor: "{colors.surface-container-lowest}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.container}"
    padding: "24px"
  input-default:
    backgroundColor: "rgba(0,0,0,0.03)"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
    height: "36px"
  badge-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
    height: "20px"
---

# Design System: HomeLuz

## 1. Overview

**Creative North Star: "The Confirmed Minute"**

HomeLuz is a timekeeping tool that earns trust through quiet precision. The interface is professional without being cold, warm without being playful. Every element communicates reliability: pill-shaped controls invite a tap, deep indigo anchors the brand as a mark of seriousness, and generous white space gives the data room to breathe.

The system explicitly rejects gamification, cartoonish illustrations, and the dense corporate aesthetic of legacy HR portals. It takes cues from Brazilian fintech: approachable, mobile-first, human. The warmth comes from the gold accent in the brand mark and the rounded tactility of every touch target, not from decorative excess.

**Key Characteristics:**
- Pill-shaped interactive controls (32px corner radius on buttons, inputs, badges)
- Deep indigo as the single brand accent, used sparingly for container backgrounds and the app shell
- Warm neutrals on surface tones — never pure #fff or #000
- Mobile-first rhythm: generous tap targets, stackable layouts, bottom-navigation primary
- Typographic hierarchy driven by weight contrast: Manrope ExtraBold headlines over Inter Regular body

## 2. Colors

A restrained palette: tinted warm neutrals carry the surface, a single deep indigo accent provides brand weight, and gold lives only in the logo.

### Primary
- **Deep Indigo Night** (#1a237e): The brand container. Used for the welcome card, sidebar active states, primary container fills. Its rarity on screen is intentional — it marks important surfaces.
- **Brand Navy** (#000666): Primary text on light surfaces, dark navy anchor for the brand. Feels authoritative but not aggressive.

### Gold (Logo Only)
- **Warm Gold** (#d4af37): Brand mark and logo only. Never used as a UI accent or interactive color. Keeps the identity warm without distracting from the product interface.

### Neutral
- **Warm Off-White** (#f8f9fa): Main surface background. Slightly warm, never clinical white.
- **White** (#ffffff): Card and elevated surface backgrounds. Used for content containers.
- **Soft Grey** (#edeeef): Surface container for secondary areas and low-priority sections.
- **Warm Grey** (#e7e8e9): Surface container high, used for progress tracks and dividers.
- **Almost Black** (#191c1d): Primary body text. High contrast without harsh #000.
- **Muted Grey** (#727272): Secondary and placeholder text.

### Interactive
- **Blue-500** (#3b82f6): Primary action color — the clock-in button, links, interactive toggles. Functions as a second accent reserved for interactions.

### Dark Mode
Dark mode inverts the surface stack: deep zinc grays replace warm off-whites, text reverses to near-white, and the indigo container shifts to a darker blue. The gold and blue accents carry through with adjusted luminance.

## 3. Typography

**Display Font:** Manrope (with sans-serif fallback)
**Body Font:** Inter (with sans-serif fallback)

Manrope's geometric warmth pairs with Inter's crisp readability. The contrast is subtle — both are sans-serif — but Manrope's wider apertures and bolder weights give headings a confident presence, while Inter recedes into comfortable body text.

### Hierarchy
- **Display** (ExtraBold 800, clamp(1.75rem, 5vw, 2.5rem), 1.1): Greeting headlines on the dashboard and feature hero sections. One per screen.
- **Headline** (Bold 700, clamp(1.25rem, 3vw, 1.75rem), 1.2): Section titles and card headings.
- **Title** (Semibold 600, 1.125rem, 1.3): Subsection headers, navigation labels.
- **Body** (Regular 400, 0.9375rem/15px, 1.5): All reading content. Capped at 65-75ch line length.
- **Label** (Medium 500, 0.8125rem/13px, 1.4, 0.01em tracking): Button text, form labels, stats, metadata. Uses uppercase + tracking for emphasis where needed.

### Named Rules
**The One Weight Rule.** Hierarchy comes from weight and size, not color or decoration. Body is Regular 400; anything important goes to Semibold 600 or Bold 700. No gradient text, no italic for emphasis.

## 4. Elevation

Flat at rest, purposeful on interaction. Surfaces sit on the same tonal plane until the user engages with them.

- **Resting cards**: no shadow. Separation from the background comes from the white fill against the warm off-white canvas.
- **Hovered/focused elements**: a subtle shadow appears to signal interactivity. Buttons lift on hover; inputs gain a focus ring.
- **Modal overlays**: a black overlay at 80% opacity with optional backdrop blur provides the only true depth layer. Content panels sit above with no shadow of their own.

### Shadow Vocabulary
- **Interactive hover** (`0 4px 24px rgba(0,0,0,0.12)`): Applied to the clock-in button and hovered cards. Soft, diffused, never sharp.
- **Focus ring** (`0 0 0 3px var(--ring)/50%`): Inputs and buttons on focus-visible. Uses the ring variable (near-transparent dark in light mode, semi-transparent light in dark mode).

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to state (hover, elevation, focus). A card with a permanent shadow is a card that looks interactive when it is not.

## 5. Components

### Buttons
- **Shape:** Pill-shaped (32px corner radius). Every button is an elongated capsule, never a square or sharp rectangle.
- **Primary:** Blue-500 background, white text, 12px 24px padding. Hover shifts to Blue-600. The large clock-in button on the dashboard is the canonical example — 224px diameter circle, not a capsule, as a deliberate exception for the primary action.
- **Ghost:** Transparent background, dark text, 8px 16px padding. Hover adds a muted background. Used for secondary actions and close buttons.
- **Outline:** Thin border (1px solid `var(--border)`), transparent background. Hover fills the background.
- **Transition:** 150ms ease for background-color and transform. Active state translates down 1px for tactile feedback.

### Cards and Containers
- **Corner Style:** Rounded-2xl (16px). The welcome card on the dashboard uses 24px (rounded-3xl) as a deliberate hero exception.
- **Background:** White (`#ffffff`) for standard cards. Deep Indigo Night (`#1a237e`) for the hero welcome card.
- **Shadow Strategy:** None at rest. Optional soft shadow (`0 4px 24px rgba(0,0,0,0.12)`) on the hero card for emphasis.
- **Border:** Subtle ring (`1px solid rgba(0,0,0,0.1)`) on standard cards instead of a visible border. The hero card uses no border.
- **Internal Padding:** 24px default (6 in Tailwind scale), 16px for compact cards (4).

### Inputs and Fields
- **Shape:** Pill-shaped (32px corner radius), 36px height.
- **Style:** Thin border (`1px solid var(--border)`), semi-transparent background (`bg-input/30`).
- **Focus:** Ring appears (`3px var(--ring)/50%`), border shifts to ring color. No lift, no glow — clean emphasis.
- **Error:** Border shifts to destructive red. Focus ring uses destructive with 20% opacity.
- **Disabled:** 50% opacity, no pointer events.

### Badges
- **Shape:** Pill-shaped (32px radius), 20px height, compact.
- **Variants:** Default uses the brand navy background with white text. Secondary uses a muted background. Destructive uses a red tint. Outline uses a thin border.
- **Usage:** Status indicators, counts, labels. Never decorative.

### Navigation
- **Sidebar (Desktop):** shadcn sidebar component, neutral background, active item uses the brand navy background with white text. Groups separated by labeled sections ("Principal", "Gestão de ponto", "Configurações").
- **Bottom Bar (Mobile):** Fixed bottom navigation. Contains 3-4 icon-labeled items. Active state uses the blue accent color. Has a persistent view-transition name for smooth page changes.

### Dialog
- **Shape:** Pill-shaped content panel (32px radius). Centered with 80% black overlay behind.
- **Header/Footer:** Stacked layout with title and description above, actions below. Close button (ghost, icon-sm) positioned in the top-right corner.

## 6. Do's and Don'ts

### Do:
- **Do** use the deep indigo sparingly — it marks important surfaces (welcome card, active nav). Overuse dilutes its weight.
- **Do** use pill-shaped controls for all interactive elements (buttons, inputs, badges, dialogs). The capsule shape signals "touch me."
- **Do** keep cards flat at rest. Only elevate on hover to indicate interactivity.
- **Do** use warm off-white (`#f8f9fa`) as the main surface color. Pure white is reserved for card interiors.
- **Do** use Manrope for all headings and Inter for body text. The pairing is intentional.
- **Do** use weight and size for hierarchy. Never use gradient text, colored text (outside links), or italic for emphasis.
- **Do** use the gold accent exclusively in the brand logo. Gold in the UI would read as gamification.

### Don't:
- **Don't** gamify the interface — no achievement badges, progress celebrations, bouncing illustrations, or confetti. This is a serious tool.
- **Don't** use side-stripe borders (border-left or border-right >1px as a colored accent on cards or list items). Use full borders, background tints, or nothing.
- **Don't** use glassmorphism or backdrop-blur as a default decorative treatment. The only blur is the modal overlay background.
- **Don't** show identical card grids with icon + heading + text repeated endlessly. Vary card sizes and content layouts.
- **Don't** use the hero-metric template (big number, small label, gradient accent) — the SaaS cliché that makes every dashboard look the same.
- **Don't** open a modal as the default interaction for primary tasks. Clock-in is a single tap, not a dialog.
- **Don't** use gradient text (`background-clip: text`) anywhere. Single solid colors only.
