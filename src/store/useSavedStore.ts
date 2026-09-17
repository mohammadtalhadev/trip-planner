import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SavedPlace } from '../types';

interface SavedState {
  places: SavedPlace[];
  isSaved: (id: string) => boolean;
  toggleSave: (place: Omit<SavedPlace, 'savedAt'>) => void;
  remove: (id: string) => void;
}

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      places: [],
      isSaved: (id) => get().places.some((p) => p.id === id),
      toggleSave: (place) =>
        set((s) =>
          s.places.some((p) => p.id === place.id)
            ? { places: s.places.filter((p) => p.id !== place.id) }
            : { places: [{ ...place, savedAt: Date.now() }, ...s.places] },
        ),
      remove: (id) => set((s) => ({ places: s.places.filter((p) => p.id !== id) })),
    }),
    { name: 'tripplanner-saved' },
  ),
);

