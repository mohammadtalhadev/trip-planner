import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchDestinations, getWeather } from '../services/api';
import { useAsync } from '../hooks/useAsync';
import { useDebounce } from '../hooks/useDebounce';
import { usePreferencesStore } from '../store/usePreferencesStore';
import { useSavedStore } from '../store/useSavedStore';
import { DestinationCard } from '../components/destination/DestinationCard';
import { EmptyState, ErrorState, LoadingState } from '../components/common/StatusStates';

const TRENDING = [
  { name: 'London', country: 'United Kingdom' },
  { name: 'Paris', country: 'France' },
  { name: 'Dubai', country: 'United Arab Emirates' },
  { name: 'Istanbul', country: 'Turkey' },
  { name: 'Tokyo', country: 'Japan' },
  { name: 'New York', country: 'United States' },
];

function TrendingDestinations() {
  const tempUnit = usePreferencesStore((s) => s.tempUnit);
  const saved = useSavedStore((s) => s.places);
  const toggleSave = useSavedStore((s) => s.toggleSave);

  // One batched weather request for all trending cities (single API call, not six).
  const query = TRENDING.map((t) => `name=${encodeURIComponent(t.name)}`).join('&');
  const geo = useAsync(async (signal) => {
    const results = await Promise.all(
      TRENDING.map(async (t) => {
        const r = await searchDestinations(`${t.name}, ${t.country}`, signal);
        return r[0] ?? null;
      }),
    );
    return results.filter((r): r is NonNullable<typeof r> => r !== null);
  }, [query]);

  const list = geo.data ?? [];
  const weather = useAsync(
    async (signal) => {
      const pairs = await Promise.all(
        list.map(async (d) => ({ id: d.id, weather: await getWeather(d.lat, d.lon, signal) })),
      );
      return Object.fromEntries(pairs.map((p) => [p.id, p.weather]));
    },
    [list.map((d) => d.id).join(',').slice(0, 200)],
    list.length > 0,
  );

  return (
    <section>
      <div className='mb-5 flex items-end justify-between'>
        <div>
          <p className='text-xs font-bold tracking-widest text-primary'>TRENDING NOW</p>
          <h2 className='text-2xl font-extrabold text-on-surface'>Popular destinations</h2>
        </div>
        <Link to='/destinations' className='text-sm font-bold text-secondary hover:underline'>Browse all →</Link>
      </div>
      {geo.status === 'loading' && <LoadingState label='Finding trending destinations…' />}
      {geo.status === 'error' && <ErrorState message={geo.error} onRetry={() => window.location.reload()} />}
      {geo.status === 'empty' && <EmptyState title='No destinations found' />}
      {geo.status === 'success' && (
        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {list.map((d) => (
            <DestinationCard
              key={d.id}
              destination={d}
              temperature={weather.data?.[d.id]?.temperature}
              weatherCode={weather.data?.[d.id]?.code}
              tempUnit={tempUnit}
              saved={saved.some((p) => p.id === d.id)}
              onToggleSave={(dest) => toggleSave({ id: dest.id, kind: 'destination', title: dest.name, subtitle: dest.country })}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export function DiscoverPage() {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 400); // debounced search: one request per pause, not per keystroke
  const navigate = useNavigate();

  const suggestions = useAsync(
    (signal) => searchDestinations(debounced, signal),
    [debounced],
    debounced.trim().length >= 2,
  );

  return (
    <div className='min-h-screen bg-[linear-gradient(180deg,#fbfaff_0%,#f4f4ff_40%,#fafaff_100%)] dark:bg-[#101322]'>
      <main className='mx-auto max-w-6xl px-6 pb-24 pt-10'>
        <header className='flex items-center justify-between'>
          <Link to='/' className='text-lg font-extrabold tracking-tight text-on-surface'>TripPlanner</Link>
          <div className='flex gap-2'>
            <Link to='/signin' className='rounded-full px-4 py-2 text-sm font-semibold text-on-surface/70 hover:bg-surface-container-low'>Sign In</Link>
            <Link to='/signup' className='rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:brightness-110'>Get Started</Link>
          </div>
        </header>

        <section className='mx-auto mt-14 max-w-2xl text-center'>
          <h1 className='text-4xl font-extrabold tracking-tight text-on-surface sm:text-5xl'>
            Where to next, <span className='text-primary'>traveler?</span>
          </h1>
          <p className='mt-4 text-on-surface/60'>Search any city to see live weather, country facts, and start planning your trip.</p>
          <div className='relative mx-auto mt-8 max-w-xl'>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Try “Istanbul”, “Tokyo”, “Lahore”…'
              aria-label='Search destinations'
              className='w-full rounded-full border border-white/80 bg-white px-6 py-4 pr-12 text-sm shadow-level2 outline-none transition focus:border-primary/50 dark:bg-surface-container/60 dark:text-white'
            />
            <span className='absolute right-5 top-1/2 -translate-y-1/2 text-on-surface/40'>🔍</span>
            {suggestions.status === 'loading' && debounced.trim().length >= 2 && (
              <div className='absolute left-1/2 top-14 z-10 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-on-surface/60 shadow-level2'>Searching…</div>
            )}
            {suggestions.status === 'success' && debounced.trim().length >= 2 && (
              <ul className='absolute z-10 mt-2 w-full overflow-hidden rounded-3xl bg-white text-left shadow-level3 dark:bg-surface-container'>
                {suggestions.data!.map((d) => (
                  <li key={d.id}>
                    <button
                      onClick={() => navigate(`/destinations/${d.id}?lat=${d.lat}&lon=${d.lon}&name=${encodeURIComponent(d.name)}&country=${encodeURIComponent(d.country)}`)}
                      className='flex w-full cursor-pointer items-center justify-between px-5 py-3.5 text-sm transition hover:bg-surface-container-low'
                    >
                      <span className='font-bold text-on-surface'>{d.name}</span>
                      <span className='text-xs text-on-surface/50'>{d.country}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {suggestions.status === 'empty' && debounced.trim().length >= 2 && (
              <div className='absolute z-10 mt-2 w-full rounded-3xl bg-white px-5 py-4 text-center text-sm text-on-surface/60 shadow-level3'>No destinations match “{debounced}”.</div>
            )}
          </div>
        </section>

        <div className='mt-20'>
          <TrendingDestinations />
        </div>
      </main>
    </div>
  );
}





