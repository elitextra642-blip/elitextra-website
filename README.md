# Elitextra Website

Independent publishing repository for the Elitextra digital platform: a premium Nigerian agricultural export experience serving buyers of cocoa, dry pap, beans powder, palm oil, dry hibiscus, and garri.

## Current Status

This is the **Milestone A** build: a polished first public showcase with dynamic client-side interactions. It is not the final full-feature platform yet; the direction is a richer dynamic site with stronger visuals, real form handling, product storytelling, and eventually advanced motion/3D where it improves buyer confidence.

## Pages

| Page | File | Purpose |
| --- | --- | --- |
| Home | `index.html` | Brand positioning, product highlights, sourcing story, buyer markets, quote CTA |
| Products | `products.html` | Product catalogue, filters, product detail drawer, quote handoff |
| Sourcing | `sourcing.html` | Sourcing model, handling process, supply-region story |
| About | `about.html` | Company story, values, buyer confidence narrative |
| Get quote | `order.html` | Structured inquiry form with live quote brief |
| Contact | `contact.html` | Contact paths and quick message form |
| Not found | `404.html` | Branded fallback page |

## Features

- Modular HTML/CSS/JS baseline with no required build step yet.
- Responsive layouts for desktop and mobile.
- Scroll reveal animations using `IntersectionObserver`.
- Product filtering and product detail drawer.
- Quote selections stored locally and carried into the quote form.
- Live quote summary based on selected products, quantity, and destination.
- Buyer-path planner for sample, wholesale, and recurring supply.
- Brand-informed market section for USA, UK, Europe, and Nigeria buyer segments.
- Local git repo separated from the larger workspace.

## Important Limits

- Forms are client-side only until a real form backend is connected.
- Pricing, certification, exact contact numbers, and legal policy content must be confirmed before final publication.
- `_archive/` is ignored and should not be deployed.
- Generated or sourced visuals should be saved into `assets/generated/` before being used in production pages.

## Local Preview

Open `index.html` directly in a browser for a quick preview, or use any local preview server you already trust on your machine.

## Deployment Targets

- Cloudflare Pages for a fast first publish.
- Netlify if easy form handling is desired.
- Vercel if the project later migrates to Next.js.
- GitHub Pages for a temporary public preview.

## Next Build Phase

See `DYNAMIC_REBUILD_ROADMAP.md` and `PUBLISHING_CHECKLIST.md`.
