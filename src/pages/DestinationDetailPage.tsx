import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getCountryInfo, getPlaceInfo, getWeather } from '../services/api';
import { useAsync } from '../hooks/useAsync';
import { usePreferencesStore } from '../store/usePreferencesStore';
import { useSavedStore } from '../store/useSavedStore';
import { ErrorState, LoadingState } from '../components/common/StatusStates';
import { formatDate, formatTemp, weatherIcon, weatherLabel } from '../utils/format';

/**
 * Each section has its OWN API request and error state, so one failing
 * request never breaks the whole page (spec section 4).
 */
export function DestinationDetailPage() {
  const { destinationId } = useParams();
  const [params] = useSearchParams();
  const name = params.get('name') ?? 'Destination';
  const country = params.get('country') ?? '';
  const lat = Number(params.get('lat'));
  const lon = Number(params.get('lon'));

  const { currency, tempUnit } = usePreferencesStore();
  const savedPlaces = useSavedStore((s) => s.places);
  const toggleSave = useSavedStore((s) => s.toggleSave);
  const isSaved = savedPlaces.some((p) => p.id === destinationId);

  // Weather (Open-Meteo) — independent
  const weather = useAsync(() => getWeather(lat, lon), [lat, lon], !Number.isNaN(lat) && !Number.isNaN(lon));
  // Description + image (Wikipedia) — independent, silently tolerates failure
  const info = useAsync(() => getPlaceInfo(name), [name]);
  // Country facts (REST Countries) — independent
  const countryInfo = useAsync(() => getCountryInfo(country), [country], country.length > 0);

  return (
    <div className='min-h-screen bg-[linear-gradient(180deg,#fbfaff_0%,#f4f4ff_40%,#fafaff_100%)] dark:bg-[#101322]'>
      <main className='mx-auto max-w-6xl px-6 pb-24 pt-10'>
        <Link to='/destinations' className='text-sm font-bold text-secondary hover:underline'>← Back to explore</Link>

        <header className='mt-6 flex flex-wrap items-start justify-between gap-4'>
          <div>
            <h1 className='text-4xl font-extrabold tracking-tight text-on-surface'>{name}</h1>
            <p className='mt-1 text-on-surface/60'>{country || 'Unknown country'}</p>
          </div>
          <div className='flex gap-2'>
            <button
              onClick={() => toggleSave({ id: destinationId!, kind: 'destination', title: name, subtitle: country, image: info.data?.image })}
              className={`cursor-pointer rounded-full px-4 py-2.5 text-sm font-bold transition ${isSaved ? 'bg-primary/10 text-primary' : 'bg-white text-on-surface/70 shadow-level1 hover:text-primary'}`}
            >
              {isSaved ? '🔖 Saved' : '🔖 Save place'}
            </button>
            <Link
              to={`/trips/new?destination=${encodeURIComponent(name)}&country=${encodeURIComponent(country)}&lat=${lat}&lon=${lon}`}
              className='rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:brightness-110'
            >
              Plan a trip here →
            </Link>
          </div>
        </header>

        <div className='mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]'>
          {/* About — Wikipedia */}
          <section className='rounded-3xl bg-white p-7 shadow-level2 dark:bg-surface-container/60'>
            <h2 className='text-lg font-extrabold text-on-surface'>About {name}</h2>
            {info.status === 'loading' && <LoadingState label='Loading description…' />}
            {info.status === 'error' && <ErrorState message='Description unavailable right now.' />}
            {info.status === 'empty' && <p className='mt-3 text-sm text-on-surface/60'>No encyclopedia entry found for this destination.</p>}
            {info.status === 'success' && info.data && (
              <div className='mt-4 flex flex-col gap-5 sm:flex-row'>
                {info.data.image && <img src={info.data.image} alt={name} className='h-44 w-full rounded-2xl object-cover sm:w-64' loading='lazy' />}
                <div>
                  <p className='text-sm leading-relaxed text-on-surface/70'>{info.data.description}</p>
                  {info.data.url && <a href={info.data.url} target='_blank' rel='noreferrer' className='mt-3 inline-block text-sm font-bold text-secondary hover:underline'>Read more on Wikipedia →</a>}
                </div>
              </div>
            )}
          </section>

          <div className='flex flex-col gap-6'>
            {/* Weather — Open-Meteo */}
            <section className='rounded-3xl bg-white p-7 shadow-level2 dark:bg-surface-container/60'>
              <h2 className='text-lg font-extrabold text-on-surface'>Current weather</h2>
              {weather.status === 'loading' && <LoadingState label='Fetching forecast…' />}
              {weather.status === 'error' && <ErrorState message='Weather service unavailable.' />}
              {weather.status === 'success' && weather.data && (
                <>
                  <div className='mt-4 flex items-center gap-4'>
                    <span className='text-4xl'>{weatherIcon(weather.data.code)}</span>
                    <div>
                      <p className='text-3xl font-extrabold text-on-surface'>{formatTemp(weather.data.temperature, tempUnit)}</p>
                      <p className='text-xs font-semibold text-on-surface/55'>{weatherLabel(weather.data.code)} · Wind {Math.round(weather.data.wind)} km/h</p>
                    </div>
                  </div>
                  <ul className='mt-5 grid grid-cols-7 gap-1 text-center'>
                    {weather.data.daily.slice(0, 7).map((d) => (
                      <li key={d.date} className='rounded-xl bg-surface-container-low py-2 dark:bg-white/5'>
                        <p className='text-[10px] font-bold text-on-surface/50'>{formatDate(d.date).split(' ')[0]}</p>
                        <p className='text-sm'>{weatherIcon(d.code)}</p>
                        <p className='text-[11px] font-bold text-on-surface'>{formatTemp(d.max, tempUnit)}</p>
                        <p className='text-[10px] text-on-surface/50'>{formatTemp(d.min, tempUnit)}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>

            {/* Country facts — REST Countries */}
            <section className='rounded-3xl bg-white p-7 shadow-level2 dark:bg-surface-container/60'>
              <h2 className='text-lg font-extrabold text-on-surface'>Country facts</h2>
              {countryInfo.status === 'loading' && <LoadingState label='Loading country info…' />}
              {countryInfo.status === 'error' && <ErrorState message='Country data unavailable.' />}
              {countryInfo.status === 'empty' && <p className='mt-3 text-sm text-on-surface/60'>Country details not found.</p>}
              {countryInfo.status === 'success' && countryInfo.data && (
                <dl className='mt-4 grid grid-cols-2 gap-4 text-sm'>
                  <div><dt className='font-semibold text-on-surface/50'>Capital</dt><dd className='font-bold text-on-surface'>{countryInfo.data.capital}</dd></div>
                  <div><dt className='font-semibold text-on-surface/50'>Region</dt><dd className='font-bold text-on-surface'>{countryInfo.data.region}</dd></div>
                  <div><dt className='font-semibold text-on-surface/50'>Population</dt><dd className='font-bold text-on-surface'>{new Intl.NumberFormat('en-US').format(countryInfo.data.population)}</dd></div>
                  <div><dt className='font-semibold text-on-surface/50'>Currencies</dt><dd className='font-bold text-on-surface'>{countryInfo.data.currencies.join(', ') || '—'} <span className='text-[10px] text-on-surface/40'>(shown as {currency})</span></dd></div>
                </dl>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
