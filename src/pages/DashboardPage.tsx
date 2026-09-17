import { Link } from 'react-router-dom';
import { useTripsStore } from '../store/useTripsStore';
import { getTripStats } from '../utils/tripStats';
import { formatDateRange, formatMoney } from '../utils/format';
import { usePreferencesStore } from '../store/usePreferencesStore';
import { EmptyState } from '../components/common/StatusStates';

export function DashboardPage() {
  const trips = useTripsStore((s) => s.trips);
  const currency = usePreferencesStore((s) => s.currency);

  const totals = trips.reduce(
    (acc, t) => {
      const s = getTripStats(t);
      acc.activities += s.totalActivities;
      acc.completed += s.completedActivities;
      acc.spent += s.totalSpent;
      acc.budget += t.budget;
      return acc;
    },
    { activities: 0, completed: 0, spent: 0, budget: 0 },
  );

  return (
    <div>
      <div className='mb-6 flex flex-wrap items-end justify-between gap-4'>
        <div>
          <p className='text-xs font-bold tracking-widest text-primary'>OVERVIEW</p>
          <h1 className='text-2xl font-extrabold text-on-surface'>Trip Dashboard</h1>
        </div>
        <Link to='/app/trips/new' className='rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:brightness-110'>+ New Trip</Link>
      </div>

      {trips.length > 0 && (
        <div className='mb-8 grid gap-5 sm:grid-cols-3'>
          <div className='rounded-3xl bg-white p-6 shadow-level2 dark:bg-surface-container/60'>
            <p className='text-xs font-bold text-on-surface/50'>Active trips</p>
            <p className='mt-2 text-3xl font-extrabold text-on-surface'>{trips.length}</p>
          </div>
          <div className='rounded-3xl bg-white p-6 shadow-level2 dark:bg-surface-container/60'>
            <p className='text-xs font-bold text-on-surface/50'>Activities completed</p>
            <p className='mt-2 text-3xl font-extrabold text-on-surface'>{totals.completed} <span className='text-base text-on-surface/40'>/ {totals.activities}</span></p>
          </div>
          <div className='rounded-3xl bg-white p-6 shadow-level2 dark:bg-surface-container/60'>
            <p className='text-xs font-bold text-on-surface/50'>Total budget used</p>
            <p className='mt-2 text-2xl font-extrabold text-on-surface'>{formatMoney(totals.spent, currency)} <span className='text-sm text-on-surface/40'>/ {formatMoney(totals.budget, currency)}</span></p>
          </div>
        </div>
      )}

      {trips.length === 0 ? (
        <EmptyState icon='🧭' title='Welcome to TripPlanner' hint='Create your first trip, or explore destinations to get inspired.'>
          <div className='mt-4 flex gap-2'>
            <Link to='/app/trips/new' className='rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white'>Create a trip</Link>
            <Link to='/' className='rounded-full bg-secondary-container/40 px-5 py-2.5 text-sm font-bold text-secondary'>Explore destinations</Link>
          </div>
        </EmptyState>
      ) : (
        <div className='space-y-4'>
          {trips.map((t) => {
            const s = getTripStats(t);
            return (
              <Link key={t.id} to={`/app/trips/${t.id}`} className='block rounded-3xl bg-white p-6 shadow-level2 transition hover:-translate-y-0.5 hover:shadow-level3 dark:bg-surface-container/60'>
                <div className='flex flex-wrap items-center justify-between gap-4'>
                  <div>
                    <h2 className='text-lg font-extrabold text-on-surface'>{t.name}</h2>
                    <p className='text-xs font-semibold text-on-surface/50'>{t.destination} · {formatDateRange(t.startDate, t.endDate)}</p>
                  </div>
                  <div className='flex gap-6 text-center text-xs font-bold text-on-surface/60'>
                    <div><p className='text-lg font-extrabold text-on-surface'>{s.daysPlanned}/{s.totalDays}</p>days</div>
                    <div><p className='text-lg font-extrabold text-on-surface'>{s.completedActivities}/{s.totalActivities}</p>done</div>
                    <div><p className='text-lg font-extrabold text-primary'>{formatMoney(s.totalSpent, currency)}</p>of {formatMoney(t.budget, currency)}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
