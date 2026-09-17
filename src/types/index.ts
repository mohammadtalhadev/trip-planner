export interface Activity {
  id: string;
  time: string; // HH:mm
  title: string;
  notes?: string;
  completed: boolean;
}

export interface Expense {
  id: string;
  category: ExpenseCategory;
  description: string;
  amount: number; // in trip base currency (USD)
  date: string; // ISO date
}

export type ExpenseCategory = 'Lodging' | 'Transport' | 'Food' | 'Activities' | 'Shopping' | 'Other';

export interface TripDay {
  id: string;
  date: string; // ISO date
  activities: Activity[];
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  country?: string;
  lat?: number;
  lon?: number;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  cover?: string;
  days: TripDay[];
  expenses: Expense[];
  createdAt: number;
}

export type SavedKind = 'destination' | 'attraction' | 'restaurant' | 'hotel';

export interface SavedPlace {
  id: string;
  kind: SavedKind;
  title: string;
  subtitle?: string;
  image?: string;
  savedAt: number;
}

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY';
export type TempUnit = 'celsius' | 'fahrenheit';
export type Theme = 'light' | 'dark';

export interface Preferences {
  currency: Currency;
  tempUnit: TempUnit;
  theme: Theme;
  defaultTravelers: number;
}

export interface GeoResult {
  id: string;
  name: string;
  country: string;
  countryCode?: string;
  lat: number;
  lon: number;
  type?: string;
  importance?: number;
}

export interface WeatherData {
  temperature: number;
  code: number;
  wind: number;
  daily: { date: string; max: number; min: number; code: number }[];
}
