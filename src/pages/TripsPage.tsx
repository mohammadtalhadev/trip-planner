import { Link } from 'react-router-dom';
import { useTripsStore } from '../store/useTripsStore';
import { formatDateRange, formatMoney } from '../utils/format';
import { EmptyState } from '../components/common/StatusStates';
import { usePreferencesStore } from '../store/usePreferencesStore';

export function TripsPage() {
  const trips = useTripsStore((s) => s.trips);
  const currency = usePreferencesStore((s) => s.currency);

  return (
    <div>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <p className='text-xs font-bold tracking-widest text-primary'>YOUR JOURNEYS</p>
          <h1 className='text-2xl font-extrabold text-on-surface'>My Trips</h1>
        </div>
        <Link to='/app/trips/new' className='rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:brightness-110'>+ New Trip</Link>
      </div>

      {trips.length === 0 ? (
        <EmptyState icon='🧳' title='No trips yet' hint='Create your first trip and start building an itinerary.'>
          <Link to='/app/trips/new' className='mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white'>Create your first trip</Link>
        </EmptyState>
      ) : (
        <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          {trips.map((t) => (
            <Link key={t.id} to={`/app/trips/${t.id}`} className='rounded-3xl border border-white/90 bg-white p-6 shadow-level2 transition hover:-translate-y-0.5 hover:shadow-level3 dark:bg-surface-container/60'>
              <div className='flex h-20 items-end rounded-2xl bg-gradient-to-br from-secondary-container/60 to-primary/25 p-4'>
                <h3 className='text-lg font-extrabold text-on-surface'>{t.name}</h3>
              </div>
              <p className='mt-3 text-sm font-semibold text-on-surface/70'>{t.destination}{t.country ? `, ${t.country}` : ''}</p>
              <p className='text-xs text-on-surface/50'>{formatDateRange(t.startDate, t.endDate)}</p>
              <div className='mt-4 flex justify-between border-t border-surface-container pt-3 text-xs font-semibold text-on-surface/60'>
                <span>👥 {t.travelers} travelers</span>
                <span className='text-primary'>{formatMoney(t.budget, currency)} budget</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
