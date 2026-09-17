import { Link, useParams } from 'react-router-dom';
import { useTripsStore } from '../store/useTripsStore';
import { getTripStats } from '../utils/tripStats';
import { EmptyState } from '../components/common/StatusStates';
import { formatDate, formatDateRange, formatMoney } from '../utils/format';
import { usePreferencesStore } from '../store/usePreferencesStore';

export function TripDetailPage() {
  const { tripId } = useParams();
  const trip = useTripsStore((s) => s.trips.find((t) => t.id === tripId));
  const currency = usePreferencesStore((s) => s.currency);

  if (!trip) {
    return <EmptyState icon='🧳' title='Trip not found' hint='It may have been deleted.' />;
  }

  const stats = getTripStats(trip);
  const budgetPct = Math.min(100, Math.round((stats.totalSpent / Math.max(1, trip.budget)) * 100));

  return (
    <div>
      <header className='mb-6 flex flex-wrap items-end justify-between gap-4'>
        <div>
          <p className='text-xs font-bold tracking-widest text-primary'>{trip.destination.toUpperCase()}</p>
          <h1 className='text-3xl font-extrabold text-on-surface'>{trip.name}</h1>
          <p className='mt-1 text-sm text-on-surface/60'>{formatDateRange(trip.startDate, trip.endDate)} · {trip.travelers} travelers</p>
        </div>
        <div className='flex gap-2'>
          <Link to={`/app/trips/${trip.id}/itinerary`} className='rounded-full bg-white px-4 py-2.5 text-sm font-bold text-secondary shadow-level1 transition hover:shadow-level2'>Itinerary</Link>
          <Link to={`/app/trips/${trip.id}/budget`} className='rounded-full bg-white px-4 py-2.5 text-sm font-bold text-secondary shadow-level1 transition hover:shadow-level2'>Budget</Link>
        </div>
      </header>

      <div className='grid gap-5 md:grid-cols-4'>
        {[
          { label: 'Days Planned', value: `${stats.daysPlanned} / ${stats.totalDays}` },
          { label: 'Total Activities', value: stats.totalActivities },
          { label: 'Completed', value: stats.completedActivities },
        ].map((card) => (
          <div key={card.label} className='rounded-3xl bg-white p-6 shadow-level2 dark:bg-surface-container/60'>
            <p className='text-xs font-bold text-on-surface/50'>{card.label}</p>
            <p className='mt-2 text-3xl font-extrabold text-on-surface'>{card.value}</p>
          </div>
        ))}
        <div className='rounded-3xl bg-white p-6 shadow-level2 dark:bg-surface-container/60'>
          <p className='text-xs font-bold text-on-surface/50'>Budget</p>
          <p className='mt-2 text-2xl font-extrabold text-on-surface'>{formatMoney(stats.totalSpent, currency)} <span className='text-sm text-on-surface/40'>/ {formatMoney(trip.budget, currency)}</span></p>
          <div className='mt-3 h-2 overflow-hidden rounded-full bg-surface-container'>
            <div className={`h-full rounded-full transition-all ${budgetPct > 90 ? 'bg-error' : 'bg-primary'}`} style={{ width: `${budgetPct}%` }} />
          </div>
          <p className='mt-2 text-xs font-semibold text-on-surface/55'>{formatMoney(stats.remaining, currency)} remaining</p>
        </div>
      </div>

      <section className='mt-8 rounded-3xl bg-white p-7 shadow-level2 dark:bg-surface-container/60'>
        <h2 className='text-lg font-extrabold text-on-surface'>Upcoming activities</h2>
        {stats.upcoming.length === 0 ? (
          <p className='mt-3 text-sm text-on-surface/55'>No upcoming activities — add some in the itinerary.</p>
        ) : (
          <div className='mt-4 grid gap-4 md:grid-cols-3'>
            {stats.upcoming.map((day) => (
              <div key={day.date} className='rounded-2xl bg-surface-container-low p-4 dark:bg-white/5'>
                <p className='text-xs font-bold text-primary'>{formatDate(day.date)}</p>
                <ul className='mt-2 space-y-1.5 text-sm'>
                  {day.items.map((item, i) => (
                    <li key={i} className='flex gap-2 text-on-surface/75'><span className='font-bold text-on-surface'>{item.time}</span> {item.title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
