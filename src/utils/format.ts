import type { Currency, TempUnit } from '../types';

const CURRENCY_SYMBOL: Record<Currency, string> = { USD: '$', EUR: '\u20AC', GBP: '\u00A3', JPY: '\u00A5' };

export function formatMoney(amount: number, currency: Currency = 'USD'): string {
  const value = new Intl.NumberFormat('en-US', { maximumFractionDigits: currency === 'JPY' ? 0 : 2 }).format(amount);
  return `${CURRENCY_SYMBOL[currency]}${value}`;
}

export function convertTemp(celsius: number, unit: TempUnit): number {
  return unit === 'celsius' ? celsius : celsius * 1.8 + 32;
}

export function formatTemp(celsius: number, unit: TempUnit = 'celsius'): string {
  return `${Math.round(convertTemp(celsius, unit))}\u00B0${unit === 'celsius' ? 'C' : 'F'}`;
}

export function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
}

export function formatDateRange(start: string, end: string): string {
  return `${formatDate(start)} \u2013 ${formatDate(end)}`;
}

export function daysBetween(start: string, end: string): number {
  const ms = new Date(end + 'T00:00:00').getTime() - new Date(start + 'T00:00:00').getTime();
  return Math.max(1, Math.round(ms / 86_400_000) + 1);
}

export function addDays(iso: string, n: number): string {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

const WEATHER_CODES: Record<number, string> = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Rime fog',
  51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
  61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
  71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 77: 'Snow grains',
  80: 'Light showers', 81: 'Showers', 82: 'Violent showers',
  85: 'Snow showers', 86: 'Heavy snow showers',
  95: 'Thunderstorm', 96: 'Thunderstorm + hail', 99: 'Severe thunderstorm',
};

export function weatherLabel(code: number): string {
  return WEATHER_CODES[code] ?? 'Unknown';
}

export function weatherIcon(code: number): string {
  if (code === 0) return '\u2600\uFE0F';
  if (code <= 3) return '\u26C5';
  if (code <= 48) return '\u1F32B\uFE0F';
  if (code <= 67) return '\u1F327\uFE0F';
  if (code <= 77) return '\u2744\uFE0F';
  if (code <= 82) return '\u1F327\uFE0F';
  if (code <= 86) return '\u1F328\uFE0F';
  return '\u26C8\uFE0F';
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
