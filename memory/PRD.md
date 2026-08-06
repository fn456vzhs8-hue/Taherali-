# PRD - Taher Ali Enterprises Wholesale Portal

## Original Problem Statement
Create a modern, professional, responsive wholesale business website for Taher Ali Enterprises supplying pickles, biscuits, and pure ghee across Hyderabad, Telangana.

## User Personas
- **Retail Store Owners / Supermarket Buyers**: Looking for bulk wholesale prices on traditional pickles, Osmania and butter biscuits, and pure ghee.
- **Caterers & Event Organizers**: Needing bulk quantity calculations and fast WhatsApp order dispatch.

## Core Requirements (Static)
- **Brand & Theme**: Modern warm olive-cream professional wholesale aesthetic with light/dark theme toggle.
- **Hero Section**: Animated welcoming showcase with floating product cards and quick action buttons.
- **Product Catalog**: 14 items across Pickles (Mango, Vegetable, Lemon, Tomato), Biscuits (Fruit, Cashew, Osmania, Pista, Besan, Chocolate Cashew, Multiflour Ladoo, Chai, Badam), and Pure Ghee (250g/500g, image placeholders).
- **Shopping Cart**: Instant update with quantity increment/decrement, item removal, and subtotal calculation.
- **Bulk Quote Calculator**: Interactive tier discount calculator (5% to 20% off for volume orders).
- **WhatsApp Order Dispatch**: One-click order placement formatting all details and sending directly to **6305486808** (Proprietor: Mohammed Abdullah Bilal, Hyderabad).
- **Contact & About**: Complete business hours, service area across Hyderabad, and Google Maps placeholder.

## What's Been Implemented (Date: July 2026)
- Fully responsive React frontend with Tailwind CSS and Lucide icons.
- Complete product catalog with category filtering and real-time search.
- Interactive shopping cart slide-over drawer with instant quantity controls.
- Dedicated Bulk Quote Calculator modal with tiered volume discounts.
- WhatsApp order message builder with precise customer checkout fields.
- Light/Dark mode switcher with persistent state.

## Mocked in Frontend
- All product data, pricing, and wholesale tiers are served locally from `src/mock.js`.
- WhatsApp order submission opens `wa.me/916305486808` with pre-filled order text.

## Prioritized Backlog
- **P0**: Direct backend database persistence for wholesale orders (Phase 2).
- **P1**: Admin dashboard for inventory and wholesale price management.
- **P2**: Multi-language support (Telugu/Urdu/English).

## Next Action Items
1. Confirm UI direction with user.
2. Wire real backend API and MongoDB storage if required in Phase 2.
