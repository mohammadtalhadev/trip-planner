import { usePreferencesStore } from '../store/usePreferencesStore';
import type { Currency, TempUnit, Theme } from '../types';

function OptionGroup<T extends string>({ label, options, value, onChange }: { label: string; options: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className='flex flex-wrap items-center justify-between gap-3 border-b border-surface-container py-5 last:border-0'>
      <p className='text-sm font-bold text-on-surface'>{label}</p>
      <div className='flex gap-2'>
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            aria-pressed={value === o.value}
            className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition ${
              value === o.value ? 'border-primary bg-primary/10 text-primary' : 'border-surface-container text-on-surface/60 hover:border-primary/40'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SettingsPage() {
  const { currency, tempUnit, theme, defaultTravelers, setCurrency, setTempUnit, setTheme, setDefaultTravelers } = usePreferencesStore();

  return (
    <div className='mx-auto max-w-2xl'>
      <p className='text-xs font-bold tracking-widest text-primary'>USER PREFERENCES</p>
      <h1 className='mb-6 text-2xl font-extrabold text-on-surface'>Settings</h1>
      <section className='rounded-3xl bg-white px-7 shadow-level2 dark:bg-surface-container/60'>
        <OptionGroup<Theme>
          label='Theme'
          value={theme}
          onChange={setTheme}
          options={[{ value: 'light', label: '☀️ Light' }, { value: 'dark', label: '🌙 Dark' }]}
        />
        <OptionGroup<TempUnit>
          label='Temperature unit'
          value={tempUnit}
          onChange={setTempUnit}
          options={[{ value: 'celsius', label: 'Celsius' }, { value: 'fahrenheit', label: 'Fahrenheit' }]}
        />
        <OptionGroup<Currency>
          label='Currency'
          value={currency}
          onChange={setCurrency}
          options={[{ value: 'USD', label: 'USD ($)' }, { value: 'EUR', label: 'EUR (€)' }, { value: 'GBP', label: 'GBP (£)' }, { value: 'JPY', label: 'JPY (¥)' }]}
        />
        <div className='flex flex-wrap items-center justify-between gap-3 py-5'>
          <p className='text-sm font-bold text-on-surface'>Default travelers</p>
          <input
            type='number'
            min={1}
            max={20}
            value={defaultTravelers}
            onChange={(e) => setDefaultTravelers(Math.max(1, Number(e.target.value)))}
            aria-label='Default number of travelers'
            className='w-24 rounded-xl border border-surface-container bg-surface-container-low/50 px-4 py-2.5 text-sm font-bold outline-none focus:border-primary/50'
          />
        </div>
      </section>
      <p className='mt-4 text-xs text-on-surface/50'>Preferences persist in localStorage and immediately affect currency formatting, weather units, and the theme across the app.</p>
    </div>
  );
}
