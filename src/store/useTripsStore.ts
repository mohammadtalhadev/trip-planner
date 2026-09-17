import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Activity, Expense, Trip, TripDay } from '../types';
import { addDays, uid } from '../utils/format';

interface TripsState {
  trips: Trip[];
  addTrip: (trip: Omit<Trip, 'id' | 'days' | 'expenses' | 'createdAt'>) => Trip;
  updateTrip: (id: string, patch: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  addActivity: (tripId: string, dayId: string, activity: Omit<Activity, 'id' | 'completed'>) => void;
  updateActivity: (tripId: string, dayId: string, activityId: string, patch: Partial<Activity>) => void;
  deleteActivity: (tripId: string, dayId: string, activityId: string) => void;
  toggleActivity: (tripId: string, dayId: string, activityId: string) => void;
  moveActivity: (tripId: string, dayId: string, activityId: string, direction: 'up' | 'down') => void;
  moveActivityToDay: (tripId: string, fromDayId: string, toDayId: string, activityId: string) => void;
  addDay: (tripId: string) => void;
  deleteDay: (tripId: string, dayId: string) => void;
  addExpense: (tripId: string, expense: Omit<Expense, 'id'>) => void;
  updateExpense: (tripId: string, expenseId: string, patch: Partial<Expense>) => void;
  deleteExpense: (tripId: string, expenseId: string) => void;
}

const withTrip = (trips: Trip[], id: string, fn: (t: Trip) => Trip) =>
  trips.map((t) => (t.id === id ? fn(t) : t));

const withDay = (trip: Trip, dayId: string, fn: (d: TripDay) => TripDay): Trip => ({
  ...trip,
  days: trip.days.map((d) => (d.id === dayId ? fn(d) : d)),
});

export const useTripsStore = create<TripsState>()(
  persist(
    (set) => ({
      trips: [],

      addTrip: (data) => {
        const dayCount = Math.max(1, Math.min(30, Math.round((new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) / 86_400_000) + 1));`n        const days: TripDay[] = Array.from({ length: dayCount }, (_, i) => ({
          id: uid(),
          date: addDays(data.startDate, i),
          activities: [],
        }));
        const trip: Trip = { ...data, id: uid(), days, expenses: [], createdAt: Date.now() };
        set((s) => ({ trips: [trip, ...s.trips] }));
        return trip;
      },

      updateTrip: (id, patch) => set((s) => ({ trips: withTrip(s.trips, id, (t) => ({ ...t, ...patch })) })),

      deleteTrip: (id) => set((s) => ({ trips: s.trips.filter((t) => t.id !== id) })),

      addActivity: (tripId, dayId, activity) =>
        set((s) => ({
          trips: withTrip(s.trips, tripId, (t) =>
            withDay(t, dayId, (d) => ({
              ...d,
              activities: [...d.activities, { ...activity, id: uid(), completed: false }].sort((a, b) => a.time.localeCompare(b.time)),
            })),
          ),
        })),

      updateActivity: (tripId, dayId, activityId, patch) =>
        set((s) => ({
          trips: withTrip(s.trips, tripId, (t) =>
            withDay(t, dayId, (d) => ({
              ...d,
              activities: d.activities
                .map((a) => (a.id === activityId ? { ...a, ...patch } : a))
                .sort((a, b) => a.time.localeCompare(b.time)),
            })),
          ),
        })),

      deleteActivity: (tripId, dayId, activityId) =>
        set((s) => ({
          trips: withTrip(s.trips, tripId, (t) =>
            withDay(t, dayId, (d) => ({ ...d, activities: d.activities.filter((a) => a.id !== activityId) })),
          ),
        })),

      toggleActivity: (tripId, dayId, activityId) =>
        set((s) => ({
          trips: withTrip(s.trips, tripId, (t) =>
            withDay(t, dayId, (d) => ({
              ...d,
              activities: d.activities.map((a) => (a.id === activityId ? { ...a, completed: !a.completed } : a)),
            })),
          ),
        })),

      moveActivity: (tripId, dayId, activityId, direction) =>
        set((s) => ({
          trips: withTrip(s.trips, tripId, (t) =>
            withDay(t, dayId, (d) => {
              const idx = d.activities.findIndex((a) => a.id === activityId);
              const swap = direction === 'up' ? idx - 1 : idx + 1;
              if (idx === -1 || swap < 0 || swap >= d.activities.length) return d;
              const next = [...d.activities];
              [next[idx], next[swap]] = [next[swap], next[idx]];
              return { ...d, activities: next };
            }),
          ),
        })),

      moveActivityToDay: (tripId, fromDayId, toDayId, activityId) =>
        set((s) => ({
          trips: withTrip(s.trips, tripId, (t) => {
            if (fromDayId === toDayId) return t;
            const activity = t.days.find((d) => d.id === fromDayId)?.activities.find((a) => a.id === activityId);
            if (!activity) return t;
            const days = t.days.map((d) => {
              if (d.id === fromDayId) return { ...d, activities: d.activities.filter((a) => a.id !== activityId) };
              if (d.id === toDayId) return { ...d, activities: [...d.activities, activity].sort((a, b) => a.time.localeCompare(b.time)) };
              return d;
            });
            return { ...t, days };
          }),
        })),

      addDay: (tripId) =>
        set((s) => ({
          trips: withTrip(s.trips, tripId, (t) => ({
            ...t,
            days: [...t.days, { id: uid(), date: addDays(t.days[t.days.length - 1].date, 1), activities: [] }],
          })),
        })),

      deleteDay: (tripId, dayId) =>
        set((s) => ({
          trips: withTrip(s.trips, tripId, (t) => (t.days.length <= 1 ? t : { ...t, days: t.days.filter((d) => d.id !== dayId) })),
        })),

      addExpense: (tripId, expense) =>
        set((s) => ({ trips: withTrip(s.trips, tripId, (t) => ({ ...t, expenses: [{ ...expense, id: uid() }, ...t.expenses] })) })),

      updateExpense: (tripId, expenseId, patch) =>
        set((s) => ({
          trips: withTrip(s.trips, tripId, (t) => ({
            ...t,
            expenses: t.expenses.map((e) => (e.id === expenseId ? { ...e, ...patch } : e)),
          })),
        })),

      deleteExpense: (tripId, expenseId) =>
        set((s) => ({
          trips: withTrip(s.trips, tripId, (t) => ({ ...t, expenses: t.expenses.filter((e) => e.id !== expenseId) })),
        })),
    }),
    { name: 'tripplanner-trips' },
  ),
);

