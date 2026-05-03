# Task 5 — FreeAPI Hub

A small React app that demos several public endpoints from [FreeAPI](https://freeapi.app). The home page lists every demo, shows each route’s **API URL**, and links into live data views styled with **Tailwind CSS v4**.

## Stack

- [React 19](https://react.dev) + [Vite 8](https://vite.dev)
- [React Router](https://reactrouter.com) for client-side routing
- [Tailwind CSS v4](https://tailwindcss.com) (via `@tailwindcss/vite`)

## Run locally

```bash
npm install
npm run dev
```

Other scripts:

- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build
- `npm run lint` — ESLint

## Routes

| Path | Demo |
|------|------|
| `/` | Hub — cards for every demo + API URLs |
| `/random-users` | Random user profiles |
| `/jokes` | Random jokes |
| `/quotes` | Quotes with authors |
| `/products` | Product grid (thumbnails, price, rating) |
| `/meals` | Meal thumbnails and metadata |
| `/random-cat` | Random cat breed + image |
| `/youtube` | YouTube-style video cards (opens YouTube in a new tab) |

Each feature page exports an `API_URL` constant (base path only). The UI shows that URL in the page header; list endpoints may request extra query parameters (`page`, `limit`) for a richer grid while keeping the displayed URL as the base endpoint.

## Project layout

- `src/App.jsx` — hub and route table
- `src/main.jsx` — app entry + `BrowserRouter`
- `src/components/PageShell.jsx` — shared layout, back link, API URL panel
- `src/lib/api.js` — `fetchJson` and response helpers
- `src/pages/*` — one component per demo

## API

All data comes from `https://api.freeapi.app` (see [FreeAPI](https://freeapi.app) for documentation and terms of use).
