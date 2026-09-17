import { usePreferencesStore } from '../store/usePreferencesStore';

export function usePreferences() {
  return usePreferencesStore();
}
