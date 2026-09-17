import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { searchDestinations } from '../services/api';
import { useAsync } from '../hooks/useAsync';
import { useDebounce } from '../hooks/useDebounce';
import { usePreferencesStore } from '../store/usePreferencesStore';
import { DestinationCard } from '../components/destination/DestinationCard';
import { EmptyState, ErrorState, SkeletonCards } from '../components/common/StatusStates';

const PER_PAGE = 9;

/** Filter/sort/pagination state lives in the URL so refresh + back/forward keep it. */
export function DestinationsPage() {
  const [params, setParams] = useSearchParams();
  const country = params.get('country') ?? '';
  const sort = params.get('sort') ?? 'name';
  const page = Math.max(1, Number(params.get('page') ?? 1));
  const [input, setInput] = useState(country);
  const debounced = useDebounce(input, 400);
  const tempUnit = usePreferencesStore((s) => s.tempUnit);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== 'page') next.delete('page');
    setParams(next);
  };

  const results = useAsync(
    (signal) => searchDestinations(debounced || 'city', signal),
    [debounced],
    true,
  );

  const filtered = useMemo(() => {
    const list = (results.data ?? []).filter((d) => d.name && d.name.toLowerCase() !== 'city');
    return [...list].sort((a, b) =>
      sort === 'importance' ? (b.importance ?? 0) - (a.importance ?? 0) : a.name.localeCompare(b.name),
    );
  }, [results.data, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className='min-h-screen bg-[linear-gradient(180deg,#fbfaff_0%,#f4f4ff_40%,#fafaff_100%)] dark:bg-[#101322]'>
      <main className='mx-auto max-w-6xl px-6 pb-24 pt-10'>
        <Link to='/' className='text-lg font-extrabold tracking-tight text-on-surface'>TripPlanner</Link>
        <h1 className='mt-8 text-3xl font-extrabold text-on-surface'>Explore destinations</h1>

        <div className='mt-6 flex flex-wrap items-center gap-3'>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Filter by country, e.g. turkey'
            aria-label='Filter by country'
            className='w-72 rounded-full border border-white/80 bg-white px-5 py-3 text-sm shadow-level1 outline-none focus:border-primary/50 dark:bg-surface-container/60 dark:text-white'
          />
          <select
            value={sort}
            onChange={(e) => setParam('sort', e.target.value)}
            aria-label='Sort results'
            className='cursor-pointer rounded-full border border-white/80 bg-white px-4 py-3 text-sm font-semibold shadow-level1 outline-none dark:bg-surface-container/60'
          >
            <option value='name'>Sort: Name</option>
            <option value='importance'>Sort: Popularity</option>
          </select>
        </div>

        <div className='mt-8'>
          {results.status === 'loading' && <SkeletonCards count={6} />}
          {results.status === 'error' && <ErrorState message={results.error} onRetry={() => setInput((v) => `${v} `)} />}
          {results.status === 'empty' && <EmptyState icon='🗺️' title='No destinations found' hint='Try another country name.' />}
          {results.status === 'success' && (
            <>
              <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                {paged.map((d) => (
                  <DestinationCard key={d.id} destination={d} tempUnit={tempUnit} />
                ))}
              </div>
              {pageCount > 1 && (
                <nav className='mt-10 flex justify-center gap-2' aria-label='Pagination'>
                  {Array.from({ length: pageCount }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setParam('page', String(i + 1))}
                      className={`size-9 cursor-pointer rounded-full text-sm font-bold transition ${i + 1 === page ? 'bg-primary text-white' : 'bg-white text-on-surface/60 hover:bg-surface-container-low'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </nav>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
