# German Train Stations Map

A small React frontend that visualizes train stations in Germany on a Leaflet map. Data is loaded from a public API; you can filter by city and click stations in the list to zoom to them on the map.

## Features

- **Data**: Fetches station data from the provided GitHub Gist API; handles loading and error states.
- **Map**: Leaflet map centered on Germany; each station is a marker; map updates when the city filter changes.
- **Stations list**: Shows name and city; stays in sync with the current filter; clicking a station zooms to and highlights it on the map.
- **City filter**: Text input with a datalist of cities; filtering applies to both the list and the map. Clear control resets the filter.

## Tech Stack

- React 19, TypeScript, Vite
- Leaflet + react-leaflet for the map
- Vitest + React Testing Library for tests

## Setup

```bash
npm install
```

## Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview production build
- `npm run test` – run tests once
- `npm run test:watch` – run tests in watch mode
- `npm run lint` – run ESLint

## Project Structure

- `src/api/` – API client (`fetchStations`)
- `src/components/` – `Map`, `StationList`, `CityFilter`
- `src/hooks/` – `useStations` (fetch + state), `useFilteredStations` (filter + cities list)
- `src/types/` – `Station` type
- `src/constants.ts` – API URL, map center, zoom

Logic is separated from UI: data and filtering live in hooks and API layer; components handle rendering and user input.

## Deployment

Build the app with `npm run build` and serve the `dist` folder with any static host (e.g. Vercel, Netlify, GitHub Pages). No environment variables are required; the app uses the public Gist URL for station data.
