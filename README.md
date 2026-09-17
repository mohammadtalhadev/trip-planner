# TripPlanner 🧭

A smart travel planning web application — discover destinations, build multi-day itineraries, manage trip budgets, and save favorite places. Built with **React 19 + TypeScript + Vite + Tailwind CSS v4**, styled after the TripPlanner "Light Frost" Figma design system.

## Features

- **Discover page** (`/`) — debounced destination search (400 ms, one request per typing pause), live search suggestions, trending destinations with real current weather, loading / error / empty states.
- **Explore** (`/destinations`) — searchable, sortable, paginated destination list. Filter/sort/page state lives in the URL (`/destinations?country=turkey&sort=name&page=2`), so refresh and back/forward work.
- **Destination details** (`/destinations/:destinationId`) — description + photo (Wikipedia), current weather + 7-day forecast (Open-Meteo), country facts (REST Countries). Each section fetches independently: one failing API never breaks the page.
- **Trip creation** (`/app/trips/new`) — name, destination, dates, travelers, budget. Days are generated automatically from the date range.
- **Itinerary builder** (`/app/trips/:tripId/itinerary`) — add/edit/delete activities, change times, add notes, mark completed, reorder within a day, and move activities between days. Nested state: `Trip → Days → Activities (+ Expenses)`.
- **Budget manager** (`/app/trips/:tripId/budget`) — add/delete expenses, filter by category, sort by date/amount, total spent / remaining, and a category breakdown bar — all derived from store state.
- **Trip dashboard** (`/app`) — aggregated stats (days planned, activities, completed, budget usage) computed from real state, never hard-coded.
- **Saved places** (`/app/saved`) — bookmark destinations; persisted in `localStorage` and survives refresh.
- **Settings** (`/app/settings`) — theme (dark/light), temperature unit (°C/°F), currency (USD/EUR/GBP/JPY), default travelers. Changes immediately affect weather display and money formatting app-wide.
- **Marketing pages** (`/welcome`, `/signin`, `/signup`) — the Figma-designed landing, sign-in and onboarding screens.

## Technology stack

| Layer | Choice |
| --- | --- |
| UI | React 19, TypeScript, Tailwind CSS v4 |
| Build | Vite |
| Routing | React Router v7 (`React.lazy` + `Suspense` per route) |
| State | Zustand (+ `persist` middleware for localStorage) |
| APIs | Open-Meteo, Nominatim (OpenStreetMap), REST Countries, Wikipedia REST |

## APIs used

| Purpose | API |
| --- | --- |
| Geocoding / destination search | `nominatim.openstreetmap.org` |
| Current weather + 7-day forecast | `api.open-meteo.com` |
| Country facts | `restcountries.com` |
| Destination description & images | `en.wikipedia.org/api/rest_v1` |

## Installation

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Environment variables

None required — all APIs are free public endpoints (no API keys).

## Project structure

```
src/
├── components/
│   ├── common/        # Modal, StatusStates (loading/error/empty), ErrorBoundary, GlassButton…
│   ├── destination/   # DestinationCard
│   ├── itinerary/     # ActivityRow (memoized), ActivityModal
│   ├── layout/        # Sidebar, MainLayout
│   └── marketing/     # Figma-designed landing sections
├── pages/             # Route pages (Discover, Destinations, Trip, Itinerary, Budget…)
├── hooks/             # useDebounce, useAsync (idle/loading/success/error/empty + abort)
├── services/          # API layer (Nominatim, Open-Meteo, REST Countries, Wikipedia)
├── store/             # Zustand stores: trips, saved places, preferences, auth (all persisted)
├── types/             # Domain models
├── utils/             # Formatting (currency/temp/dates), trip-stats derivations
└── routes/
```

## State management approach

**Zustand** was chosen over Context/Redux because:

- Multiple pages (dashboard, trips, itinerary, budget) read and update the same deeply nested trip state — a store avoids prop drilling entirely.
- Selectors (`useTripsStore(s => s.addActivity)`) keep re-renders surgical: toggling one activity only re-renders that row (ActivityRow is additionally `React.memo`-ed).
- The `persist` middleware gives localStorage persistence for trips, saved places, preferences, theme and auth for free.

Client state (trips, preferences) lives in Zustand; **server state** (weather, geocoding) is never copied into the store — it is fetched per-section by the `useAsync` hook, which tracks `idle / loading / success / error / empty`, aborts stale requests with `AbortController`, and discards out-of-order responses so fast-typed searches can never show outdated data.

## Important technical decisions

- **Debounced search + race-condition safety** — `useDebounce` (400 ms) + per-request `AbortController` + monotonic run-ID comparison in `useAsync`.
- **Independent per-section fetches** on the destination page so partial API failures degrade gracefully.
- **Derived dashboard values** (`utils/tripStats.ts`) — budget/spending/activity numbers are computed from store state at render time; nothing is duplicated or hard-coded.
- **Route-level code splitting** — every page is `React.lazy`-loaded behind `Suspense`, keeping the initial bundle small.
- **URL as state** for the explore page filters (shareable, refresh-safe, back/forward-safe).
- **Error Boundary** wraps the whole router with a friendly retry UI.
- **Dark mode** via a Tailwind `dark` custom variant driven by the persisted preferences store.
