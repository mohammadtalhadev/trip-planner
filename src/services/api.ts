import type { GeoResult, WeatherData } from '../types';

const NOMINATIM = 'https://nominatim.openstreetmap.org';
const OPEN_METEO = 'https://api.open-meteo.com/v1/forecast';
const REST_COUNTRIES = 'https://restcountries.com/v3.1';
const WIKIPEDIA = 'https://en.wikipedia.org/api/rest_v1';

async function getJSON<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return (await res.json()) as T;
}

/** Geocoding search via OpenStreetMap / Nominatim. Supports AbortController for race-condition safety. */
export async function searchDestinations(query: string, signal?: AbortSignal): Promise<GeoResult[]> {
  const url = `${NOMINATIM}/search?q=${encodeURIComponent(query)}&format=jsonv2&limit=8&addressdetails=1&featuretype=city`;
  const data = await getJSON<Array<Record<string, unknown>>>(url, signal);
  return data.map((d) => {
    const address = (d.address ?? {}) as Record<string, string>;
    return {
      id: String(d.place_id),
      name: String(d.name || String(d.display_name).split(',')[0]),
      country: address.country ?? '',
      countryCode: address.country_code?.toUpperCase(),
      lat: Number(d.lat),
      lon: Number(d.lon),
      type: String(d.type ?? ''),
      importance: Number(d.importance ?? 0),
    };
  });
}

/** Reverse geocode a coordinate to a city name (used for trips created from map picks). */
export async function reverseGeocode(lat: number, lon: number, signal?: AbortSignal): Promise<GeoResult | null> {
  const url = `${NOMINATIM}/reverse?lat=${lat}&lon=${lon}&format=jsonv2&zoom=10`;
  const d = await getJSON<Record<string, unknown>>(url, signal);
  if (!d || !d.address) return null;
  const address = d.address as Record<string, string>;
  return {
    id: String(d.place_id ?? ''),
    name: String(d.name || address.city || address.town || address.village || ''),
    country: address.country ?? '',
    lat,
    lon,
  };
}

/** Current weather + 7-day forecast via Open-Meteo. */
export async function getWeather(lat: number, lon: number, signal?: AbortSignal): Promise<WeatherData> {
  const url = `${OPEN_METEO}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=7&timezone=auto`;
  const d = await getJSON<{
    current: { temperature_2m: number; weather_code: number; wind_speed_10m: number };
    daily: { time: string[]; temperature_2m_max: number[]; temperature_2m_min: number[]; weather_code: number[] };
  }>(url, signal);
  return {
    temperature: d.current.temperature_2m,
    code: d.current.weather_code,
    wind: d.current.wind_speed_10m,
    daily: d.daily.time.map((date, i) => ({
      date,
      max: d.daily.temperature_2m_max[i],
      min: d.daily.temperature_2m_min[i],
      code: d.daily.weather_code[i],
    })),
  };
}

export interface CountryInfo {
  name: string;
  capital: string;
  population: number;
  region: string;
  currencies: string[];
  flag: string;
}

/** Country metadata via REST Countries. */
export async function getCountryInfo(name: string, signal?: AbortSignal): Promise<CountryInfo | null> {
  const url = `${REST_COUNTRIES}/name/${encodeURIComponent(name)}?fields=name,capital,population,region,currencies,flags`;
  const list = await getJSON<Array<Record<string, any>>>(url, signal);
  const c = list?.[0];
  if (!c) return null;
  return {
    name: c.name?.common ?? name,
    capital: (c.capital ?? [])[0] ?? '-',
    population: c.population ?? 0,
    region: c.region ?? '-',
    currencies: Object.keys(c.currencies ?? {}),
    flag: c.flags?.png ?? '',
  };
}

export interface PlaceInfo {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

/** Destination description + photo via Wikipedia REST API. */
export async function getPlaceInfo(title: string, signal?: AbortSignal): Promise<PlaceInfo | null> {
  const url = `${WIKIPEDIA}/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}`;
  try {
    const d = await getJSON<Record<string, any>>(url, signal);
    return {
      title: d.title ?? title,
      description: d.extract ?? '',
      image: d.thumbnail?.source ?? d.originalimage?.source,
      url: d.content_urls?.desktop?.page,
    };
  } catch {
    return null; // missing wiki page should not break the page
  }
}

