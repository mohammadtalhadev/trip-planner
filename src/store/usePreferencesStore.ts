import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Currency, Preferences, TempUnit, Theme } from '../types';

interface PreferencesState extends Preferences {
  setCurrency: (c: Currency) => void;
  setTempUnit: (u: TempUnit) => void;
  setTheme: (t: Theme) => void;
  setDefaultTravelers: (n: number) => void;
}

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      currency: 'USD',
      tempUnit: 'celsius',
      theme: 'light',
      defaultTravelers: 2,
      setCurrency: (currency) => set({ currency }),
      setTempUnit: (tempUnit) => set({ tempUnit }),
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
      setDefaultTravelers: (defaultTravelers) => set({ defaultTravelers }),
    }),
    {
      name: 'tripplanner-preferences',
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.theme);
      },
    },
  ),
);
