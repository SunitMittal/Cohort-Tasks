# Mintlify Landing Page

A landing page inspired by [Mintlify](https://www.mintlify.com) — the intelligent documentation platform. Built with HTML and CSS, it showcases a hero, company logos, features, enterprise section, customer stories, and a call-to-action with a light theme and responsive layout.

## Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- VS Code with Live Server extension

## Usage

- Open `index.html` in any web browser. Keep the `public/` folder in the same directory so images and assets load correctly.
- Edit `index.html` to change copy, links, nav items, or add/remove sections.
- Edit `style.css` to change colors (CSS variables in `:root`), typography, spacing, or layout.

## Features

- **Semantic HTML5** — `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` for clear structure and accessibility
- **External CSS** — `style.css` with:
  - CSS custom properties for theme (background, text, borders, brand, blur)
  - Light theme by default; lab colors for consistency
  - Google Fonts (e.g. Inter, Hubot Sans) and fallbacks
  - Flexbox and grid for header, hero, company strip, features, enterprise, and CTA
- **Sections included:**
  - **Header** — Mintlify wordmark (with scroll-based animation), nav (Resources, Documentation, Customers, Blog, Pricing), Contact sales & Start for free buttons
  - **Hero** — “The Intelligent Knowledge Platform” headline, short description, email input + “Start now” button, “new” badge (e.g. self-updating docs), hero image
  - **Company strip** — Logos of companies/partners (e.g. Vercel, Coinbase, Google) via inline SVG
  - **Features** — “Built for the intelligence age” with mockup cards (LLMs.txt & MCP, agent, Assistant) and images
  - **Enterprise** — “Bring intelligence to enterprise knowledge” with cards (professional services, compliance/SOC 2) and customer story (e.g. Anthropic) with metrics
  - **Customers** — Additional customer or social proof content
  - **CTA** — Final call-to-action (e.g. try or sign up)
- **Responsive-friendly** — Layout and typography adapt to different screen sizes
- **Assets** — Logos, mockups, and SVGs in `public/` for easy replacement

## Author

**Sunit Mittal**
GitHub: *https://github.com/SunitMittal*
