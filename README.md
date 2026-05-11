# Elitextra Website

> Premium multi-page website for Elitextra — Nigerian agricultural export company connecting family farms to global buyers.

**Live site value:** ~$50,000 (premium design, animations, multi-step ordering, B2B conversion focus)

---

## Pages

| Page | File | Purpose |
|------|------|---------|
| **Home** | `index.html` | Hero, products showcase, stats, process, testimonials, CTA |
| **Products** | `products.html` | Filterable product grid with specs, MOQ info, shipping details |
| **About** | `about.html` | Company story, mission/vision, values, team, timeline, certifications |
| **Sourcing** | `sourcing.html` | Direct sourcing model, farm network, traceability, sustainability |
| **Order** | `order.html` | Multi-step inquiry form, FAQ, WhatsApp contact |
| **Contact** | `contact.html` | Contact form, office locations, world map, FAQ |

---

## Getting Started

Open any `.html` file directly in a browser — no build step required.

```
open index.html
```

For local development with live reload:
```bash
npx serve .
# or
python -m http.server 8000
```

---

## Design System

All CSS is modular and lives in `css/`:

| File | Purpose |
|------|---------|
| `variables.css` | Design tokens (colors, spacing, typography, animations) |
| `base.css` | Reset, typography, utility classes, global styles |
| `animations.css` | Keyframes, scroll-triggered reveals, hover effects |
| `components.css` | Buttons, cards, forms, tabs, accordions, badges |
| `layout.css` | Header, footer, navigation, section layouts |

---

## JavaScript

`js/main.js` powers:
- Scroll-triggered reveal animations (IntersectionObserver)
- Counter animations on scroll
- Header shrink on scroll + backdrop blur
- Mobile hamburger menu
- Smooth anchor scrolling
- Product category filtering
- Multi-step order form
- Testimonial slider
- FAQ accordions
- Modal open/close
- Contact form submission handler
- Scroll-to-top button
- Lazy loading

---

## Brand

- **Company:** Elitextra (Nigeria)
- **Tagline:** From Nigerian Soil to Global Tables
- **Colors:** Forest Green #2E7D32, Rich Gold #C9A227, Deep Brown #5D4037, Cream #F5F5DC
- **Fonts:** Montserrat (headlines), Open Sans (body), Playfair Display (accent)
- **Products:** Cocoa, Dry Pap (Ogi), Beans Powder, Palm Oil, Dry Hibiscus (Zobo), Garri
- **Markets:** USA · UK · Germany · Netherlands · France · Nigeria

---

## Key Features

- **$50K-level design** — custom CSS variables design system, premium animations, micro-interactions
- **Scroll-reveal animations** — staggered entrance effects on every section
- **Multi-step order form** — product selection → quantity → contact → review flow
- **Product filter system** — filter by category on the products page
- **Mobile-responsive** — optimized grid layouts for all breakpoints
- **B2B conversion focused** — every page drives toward inquiry/WhatsApp/email
- **No external dependencies** — pure HTML/CSS/JS, no frameworks

---

## Deployment

Deploy the entire `elitextra-website/` directory to any static host:

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod

# Cloudflare Pages
wrangler pages deploy .

# GitHub Pages
# Push to repo → Settings → Pages → Deploy from main branch
```

---

*Built: April 2026 · Claude Code · Elitextra Project*