# TripPlanner

Smart travel planning web application — discover destinations, build multi-day itineraries, manage trip budgets, and save favorite places.

## Overview

_TODO: 2-3 sentence summary of what the app does and why it was built (fill in once core features are working)._

## Features

- [ ] Destination search with debounced input and suggestions
- [ ] Destination details with weather, attractions, restaurants, hotels
- [ ] Trip creation (name, destination, dates, travelers, budget)
- [ ] Multi-day itinerary builder (add/edit/delete/reorder activities, move between days)
- [ ] Budget & expense tracking with category breakdown
- [ ] Saved places (bookmarks), persisted locally
- [ ] User preferences (currency, temperature unit, theme, default travelers)
- [ ] Trip dashboard with live summary stats

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS
- React Router
- Zustand (state management)
- Axios (API requests)

## APIs Used

| API | Purpose |
|---|---|
| Open-Meteo | Current weather + forecast |
| REST Countries | Country info (capital, population, currency, region, flag) |
| Nominatim (OpenStreetMap) | Geocoding / location lookup |
| _TBD_ | Attractions / restaurants / hotels |
| _TBD_ | Images (if used) |

## Setup

```bash
git clone https://github.com/mohammadtalhadev/trip-planner.git
cd trip-planner
npm install
cp .env.example .env.local
# fill in .env.local with your own API keys
npm run dev
```

## Environment Variables

See `.env.example` for the full list. All variables must be prefixed `VITE_` to be exposed to the client.

## Project Structure

src/
├── components/
│ ├── common/ # Reusable UI primitives (GlassCard, GlassButton, etc.)
│ ├── layout/ # Sidebar, TopBar, BottomNav, AppLayout
│ ├── destination/
│ ├── itinerary/
│ ├── budget/
│ └── dashboard/
├── pages/
├── hooks/
├── services/
├── store/
├── utils/
├── types/
└── routes/


## State Management Approach

_TODO: fill in once Phase 3 is built — explain why Zustand was chosen over Context/Redux, how the nested Trip → Days → Activities/Expenses tree is modeled, and how localStorage persistence is handled._

## Key Technical Decisions

_TODO: running log — add an entry each time you make a decision worth defending in the demo, e.g.:_
- _Why AbortController is used for search requests_
- _Why debounce delay was set to X ms_
- _Where memoization was applied and why_