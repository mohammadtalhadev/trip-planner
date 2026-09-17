import type { ExpenseCategory, Trip } from '../types';

export interface TripStats {
  totalActivities: number;
  completedActivities: number;
  daysPlanned: number;
  totalDays: number;
  totalSpent: number;
  remaining: number;
  byCategory: Record<ExpenseCategory | 'Uncategorized', number>;
  upcoming: { date: string; items: { time: string; title: string }[] }[];
}

/** All dashboard numbers are derived from actual trip state — nothing duplicated. */
export function getTripStats(trip: Trip): TripStats {
  const activities = trip.days.flatMap((d) => d.activities);
  const today = new Date().toISOString().slice(0, 10);
  const byCategory = {} as Record<ExpenseCategory | 'Uncategorized', number>;
  let totalSpent = 0;
  for (const e of trip.expenses) {
    byCategory[e.category] = (byCategory[e.category] ?? 0) + e.amount;
    totalSpent += e.amount;
  }
  const upcoming = trip.days
    .filter((d) => d.date >= today)
    .slice(0, 3)
    .map((d) => ({
      date: d.date,
      items: d.activities.filter((a) => !a.completed).slice(0, 4).map((a) => ({ time: a.time, title: a.title })),
    }))
    .filter((d) => d.items.length > 0);
  return {
    totalActivities: activities.length,
    completedActivities: activities.filter((a) => a.completed).length,
    daysPlanned: trip.days.filter((d) => d.activities.length > 0).length,
    totalDays: trip.days.length,
    totalSpent,
    remaining: trip.budget - totalSpent,
    byCategory,
    upcoming,
  };
}
