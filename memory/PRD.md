# PRD - Taher Ali Enterprises Wholesale Portal

## Original Problem Statement
Modern, professional, responsive wholesale B2B website for Taher Ali Enterprises (pickles, biscuits, ghee based in Alijah Kotla, Charminar, Hyderabad). Requirements: sticky nav, animated hero, cream/olive-green theme, product catalog, cart with WhatsApp order integration, about/contact, mobile responsive.

## Product Requirements Added Through Session
- Separated Home & Retail Products pages (React Router).
- Amazon-style spacious retail product detail pages.
- Dedicated Wholesale Products page — text-only business table, 100+ items with quantity presets (20/50/100) and min-10 validation.
- Single unified cart & checkout for both retail + wholesale (one WhatsApp message).
- Live user-uploaded product images in the retail catalog (all 10 items).

## Current Catalog (mock.js) — all with real photos
- **Pickles ₹89 / 250g**: Mango, Vegetable, Lemon, Tomato
- **Biscuits**: Fruit (400g/₹220), Cashew (400g/₹240), Osmania (400g/₹240), Pista (300g/₹270), Badam (300g/₹290)
- **Ghee**: Pure Ghee (250g/₹199) — Dadi's Pure Desi Ghee

## What's Been Implemented
### Feb 2026 — Full Image Set + Light Mode Readability
- Mapped remaining 5 uploaded images (Cashew, Osmania, Pista, Badam biscuits + Pure Ghee) into `mock.js`. All 10 retail products now render real photography.
- Global light-mode contrast boost: bumped `text-gray-{400,500,600}` → `text-gray-{600,700,800}` across all pages & components. Dark-mode colors (custom hex) untouched.
- Fixed "Our Promise" green banner: `Hygienic Facility` / `Honest Pricing` cards had `glass-panel` forcing near-white background, making white text invisible in light mode. Removed `glass-panel` and set explicit `text-white`.

### Feb 2026 — Initial 5 Live Product Images
- Mapped Mango, Vegetable, Lemon, Tomato pickles + Fruit Biscuit into `mock.js`.
- Updated `ProductCard.jsx`, `ProductDetailPage.jsx` (main + thumbnails + MiniCard) to render real `product.image` when present, fallback to emoji placeholder otherwise.

### Earlier Sessions
- React Router split (HomePage + ProductsPage + WholesaleProductsPage + ProductDetailPage).
- WholesaleQuantityDialog (presets 20/50/100, min 10).
- Unified `ShopContext` cart handling retail + wholesale together.
- Unified `CheckoutModal` mandatory fields + WhatsApp order string generation.
- Floating cart button + fly-to-cart animation.
- Amazon-style product detail with sticky bottom purchase bar.
- Cream/olive green theme + WCAG-AA contrast fixes site-wide.
- Mobile checkout scroll + back-button freeze bug fixes.

## Architecture
```
/app/frontend/src/
├── components/    Navbar, Footer, ProductCard, CartDrawer, CheckoutModal, FloatingCartButton, WholesaleQuantityDialog
├── context/       ShopContext.jsx (global cart + theme + modals)
├── data/          wholesaleProducts.js (100+ auto-generated)
├── pages/         HomePage, ProductsPage, ProductDetailPage, WholesaleProductsPage
├── utils/         flyToCart.js
├── App.js         React Router setup
└── mock.js        Retail PRODUCTS + BUSINESS_INFO
```

## 3rd Party Integrations
- WhatsApp — URL-parameter deep link (no API key), whatsappNumber `916305486808`.

## Backlog / Roadmap
### P1
- Phase 2: FastAPI + MongoDB backend to replace mock.js (product CRUD, order persistence, admin panel).
- Multi-image gallery per product (currently 1 image duplicated across 4 thumbs).

### P2
- Order confirmation email/SMS receipts.
- Admin dashboard for stock & pricing management.
- SEO metadata + sitemap for public discovery.
- Full-screen image lightbox on tap.

## Testing Status
- Frontend heavily tested via testing_agent (iterations 3–9 all passed).
- Feb 2026: Live image mapping + light-mode contrast verified via screenshots (Retail Catalog all 10 photos, Pure Ghee detail, home Promise banner readable).

## Test Credentials
None required (fully public frontend, WhatsApp deep-link).
