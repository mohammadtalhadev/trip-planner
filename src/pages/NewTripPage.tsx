import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTripsStore } from '../store/useTripsStore';
import { usePreferencesStore } from '../store/usePreferencesStore';

export function NewTripPage() {
  const [params] = useSearchParams();
  const addTrip = useTripsStore((s) => s.addTrip);
  const defaultTravelers = usePreferencesStore((s) => s.defaultTravelers);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    destination: params.get('destination') ?? '',
    country: params.get('country') ?? '',
    lat: params.get('lat') ?? '',
    lon: params.get('lon') ?? '',
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date(Date.now() + 7 * 86_400_000).toISOString().slice(0, 10),
    travelers: defaultTravelers,
    budget: 2500,
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.type === 'number' ? Number(e.target.value) : e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trip = addTrip({
      name: form.name.trim(),
      destination: form.destination.trim(),
      country: form.country.trim() || undefined,
      lat: form.lat ? Number(form.lat) : undefined,
      lon: form.lon ? Number(form.lon) : undefined,
      startDate: form.startDate,
      endDate: form.endDate < form.startDate ? form.startDate : form.endDate,
      travelers: Math.max(1, form.travelers),
      budget: Math.max(0, form.budget),
    });
    navigate(`/app/trips/${trip.id}`);
  };

  const inputClass = 'mt-1.5 w-full rounded-xl border border-surface-container bg-surface-container-low/50 px-4 py-3 text-sm outline-none focus:border-primary/50';

  return (
    <div className='mx-auto max-w-2xl'>
      <p className='text-xs font-bold tracking-widest text-primary'>TRIP CREATION</p>
      <h1 className='text-2xl font-extrabold text-on-surface'>Create a new trip</h1>
      <form onSubmit={handleSubmit} className='mt-6 space-y-5 rounded-3xl bg-white p-8 shadow-level2 dark:bg-surface-container/60'>
        <div>
          <label htmlFor='trip-name' className='text-xs font-bold text-on-surface/70'>Trip Name</label>
          <input id='trip-name' required value={form.name} onChange={set('name')} placeholder='Turkey Vacation' className={inputClass} />
        </div>
        <div>
          <label htmlFor='trip-dest' className='text-xs font-bold text-on-surface/70'>Destination</label>
          <input id='trip-dest' required value={form.destination} onChange={set('destination')} placeholder='Istanbul' className={inputClass} />
        </div>
        <div className='grid gap-4 sm:grid-cols-2'>
          <div>
            <label htmlFor='trip-start' className='text-xs font-bold text-on-surface/70'>Start Date</label>
            <input id='trip-start' type='date' required value={form.startDate} onChange={set('startDate')} className={inputClass} />
          </div>
          <div>
            <label htmlFor='trip-end' className='text-xs font-bold text-on-surface/70'>End Date</label>
            <input id='trip-end' type='date' required value={form.endDate} onChange={set('endDate')} className={inputClass} />
          </div>
        </div>
        <div className='grid gap-4 sm:grid-cols-2'>
          <div>
            <label htmlFor='trip-travelers' className='text-xs font-bold text-on-surface/70'>Travelers</label>
            <input id='trip-travelers' type='number' min={1} required value={form.travelers} onChange={set('travelers')} className={inputClass} />
          </div>
          <div>
            <label htmlFor='trip-budget' className='text-xs font-bold text-on-surface/70'>Budget (USD)</label>
            <input id='trip-budget' type='number' min={0} required value={form.budget} onChange={set('budget')} className={inputClass} />
          </div>
        </div>
        <button type='submit' className='w-full cursor-pointer rounded-full bg-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:brightness-110'>
          Create Trip &amp; Open Itinerary →
        </button>
      </form>
    </div>
  );
}
