import { Link } from 'react-router-dom';
import { useSavedStore } from '../store/useSavedStore';
import { EmptyState } from '../components/common/StatusStates';

const KIND_META: Record<string, { icon: string; label: string }> = {
  destination: { icon: '🗺️', label: 'Destination' },
  attraction: { icon: '📸', label: 'Attraction' },
  restaurant: { icon: '🍽️', label: 'Restaurant' },
  hotel: { icon: '🏨', label: 'Hotel' },
};

export function SavedPage() {
  const places = useSavedStore((s) => s.places);
  const remove = useSavedStore((s) => s.remove);

  return (
    <div>
      <div className='mb-6'>
        <p className='text-xs font-bold tracking-widest text-primary'>BOOKMARKS</p>
        <h1 className='text-2xl font-extrabold text-on-surface'>Saved Places</h1>
        <p className='text-sm text-on-surface/55'>Persisted in localStorage — they survive a full page refresh.</p>
      </div>
      {places.length === 0 ? (
        <EmptyState icon='🔖' title='Nothing saved yet' hint='Save destinations from the Discover or Explore pages.'>
          <Link to='/' className='mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white'>Discover destinations</Link>
        </EmptyState>
      ) : (
        <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          {places.map((p) => (
            <article key={p.id} className='flex items-start gap-4 rounded-3xl bg-white p-5 shadow-level2 dark:bg-surface-container/60'>
              <span className='grid size-11 shrink-0 place-items-center rounded-2xl bg-surface-container text-lg'>{KIND_META[p.kind]?.icon ?? '📍'}</span>
              <div className='min-w-0 flex-1'>
                <p className='truncate font-bold text-on-surface'>{p.title}</p>
                <p className='truncate text-xs text-on-surface/50'>{p.subtitle ?? KIND_META[p.kind]?.label}</p>
              </div>
              <button onClick={() => remove(p.id)} aria-label={`Remove ${p.title}`} className='grid size-8 shrink-0 cursor-pointer place-items-center rounded-lg text-xs text-on-surface/50 transition hover:bg-error/10 hover:text-error'>🗑</button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
