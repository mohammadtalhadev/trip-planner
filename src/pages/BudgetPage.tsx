import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTripsStore } from '../store/useTripsStore';
import { usePreferencesStore } from '../store/usePreferencesStore';
import type { ExpenseCategory } from '../types';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/StatusStates';
import { formatDate, formatMoney } from '../utils/format';
import { getTripStats } from '../utils/tripStats';

const CATEGORIES: ExpenseCategory[] = ['Lodging', 'Transport', 'Food', 'Activities', 'Shopping', 'Other'];

const inputClass = 'mt-1.5 w-full rounded-xl border border-surface-container bg-surface-container-low/50 px-4 py-3 text-sm outline-none focus:border-primary/50';

const CATEGORY_COLORS: Record<string, string> = {
  Lodging: 'bg-secondary',
  Transport: 'bg-tertiary',
  Food: 'bg-primary',
  Activities: 'bg-purple-500',
  Shopping: 'bg-pink-500',
  Other: 'bg-on-surface/40',
};

export function BudgetPage() {
  const { tripId } = useParams();
  const trip = useTripsStore((s) => s.trips.find((t) => t.id === tripId));
  const currency = usePreferencesStore((s) => s.currency);
  const addExpense = useTripsStore((s) => s.addExpense);
  const updateExpense = useTripsStore((s) => s.updateExpense);
  const deleteExpense = useTripsStore((s) => s.deleteExpense);

  const [filter, setFilter] = useState<'all' | ExpenseCategory>('all');
  const [sort, setSort] = useState<'date' | 'amount'>('date');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ description: '', amount: 0, category: 'Food' as ExpenseCategory, date: new Date().toISOString().slice(0, 10) });

  const stats = useMemo(() => (trip ? getTripStats(trip) : null), [trip]);

  const visible = useMemo(() => {
    if (!trip) return [];
    const list = trip.expenses.filter((e) => filter === 'all' || e.category === filter);
    return [...list].sort((a, b) => (sort === 'amount' ? b.amount - a.amount : b.date.localeCompare(a.date)));
  }, [trip, filter, sort]);

  if (!trip || !stats) return <EmptyState icon='🧳' title='Trip not found' />;

  return (
    <div>
      <header className='mb-6 flex flex-wrap items-end justify-between gap-4'>
        <div>
          <p className='text-xs font-bold tracking-widest text-primary'>BUDGET MANAGEMENT</p>
          <h1 className='text-2xl font-extrabold text-on-surface'>{trip.name}</h1>
        </div>
        <div className='flex gap-2'>
          <Link to={`/app/trips/${trip.id}/itinerary`} className='rounded-full bg-white px-4 py-2.5 text-sm font-bold text-secondary shadow-level1'>Itinerary</Link>
          <button onClick={() => setModalOpen(true)} className='cursor-pointer rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:brightness-110'>+ Add expense</button>
        </div>
      </header>

      <div className='grid gap-5 md:grid-cols-3'>
        {[
          { label: 'Total Budget', value: formatMoney(trip.budget, currency) },
          { label: 'Total Spent', value: formatMoney(stats.totalSpent, currency) },
          { label: 'Remaining', value: formatMoney(stats.remaining, currency) },
        ].map((c) => (
          <div key={c.label} className='rounded-3xl bg-white p-6 shadow-level2 dark:bg-surface-container/60'>
            <p className='text-xs font-bold text-on-surface/50'>{c.label}</p>
            <p className={`mt-2 text-3xl font-extrabold ${c.label === 'Remaining' && stats.remaining < 0 ? 'text-error' : 'text-on-surface'}`}>{c.value}</p>
          </div>
        ))}
      </div>

      <section className='mt-5 rounded-3xl bg-white p-7 shadow-level2 dark:bg-surface-container/60'>
        <h2 className='text-sm font-extrabold text-on-surface'>Spending by category</h2>
        <div className='mt-4 flex h-3 overflow-hidden rounded-full bg-surface-container'>
          {CATEGORIES.map((cat) => {
            const amount = stats.byCategory[cat] ?? 0;
            if (amount <= 0) return null;
            return <div key={cat} className={CATEGORY_COLORS[cat]} style={{ width: `${(amount / Math.max(1, stats.totalSpent)) * 100}%` }} title={`${cat}: ${formatMoney(amount, currency)}`} />;
          })}
        </div>
        <div className='mt-3 flex flex-wrap gap-4 text-xs font-semibold text-on-surface/60'>
          {CATEGORIES.filter((c) => (stats.byCategory[c] ?? 0) > 0).map((c) => (
            <span key={c} className='flex items-center gap-1.5'>
              <span className={`size-2.5 rounded-full ${CATEGORY_COLORS[c]}`} /> {c} · {formatMoney(stats.byCategory[c], currency)}
            </span>
          ))}
          {stats.totalSpent === 0 && <span>No expenses logged yet.</span>}
        </div>
      </section>

      <section className='mt-5 rounded-3xl bg-white p-7 shadow-level2 dark:bg-surface-container/60'>
        <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
          <h2 className='text-sm font-extrabold text-on-surface'>Expenses</h2>
          <div className='flex gap-2'>
            <select value={filter} onChange={(e) => setFilter(e.target.value as 'all' | ExpenseCategory)} aria-label='Filter expenses' className='cursor-pointer rounded-full border border-surface-container bg-white px-3 py-2 text-xs font-semibold outline-none'>
              <option value='all'>All categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value as 'date' | 'amount')} aria-label='Sort expenses' className='cursor-pointer rounded-full border border-surface-container bg-white px-3 py-2 text-xs font-semibold outline-none'>
              <option value='date'>Sort: Newest</option>
              <option value='amount'>Sort: Amount</option>
            </select>
          </div>
        </div>
        {visible.length === 0 ? (
          <p className='py-8 text-center text-sm text-on-surface/50'>No expenses match this filter.</p>
        ) : (
          <ul className='divide-y divide-surface-container'>
            {visible.map((e) => (
              <li key={e.id} className='flex items-center gap-4 py-3'>
                <span className={`size-2.5 shrink-0 rounded-full ${CATEGORY_COLORS[e.category]}`} />
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-bold text-on-surface'>{e.description}</p>
                  <p className='text-xs text-on-surface/50'>{e.category} · {formatDate(e.date)}</p>
                </div>
                <span className='text-sm font-extrabold text-on-surface'>{formatMoney(e.amount, currency)}</span>
                <button onClick={() => deleteExpense(trip.id, e.id)} aria-label='Delete expense' className='grid size-8 cursor-pointer place-items-center rounded-lg text-xs text-on-surface/50 transition hover:bg-error/10 hover:text-error'>🗑</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Modal open={modalOpen} title='Add expense' onClose={() => setModalOpen(false)}>
        <form
          className='space-y-4'
          onSubmit={(e) => {
            e.preventDefault();
            if (!form.description.trim() || form.amount <= 0) return;
            addExpense(trip.id, { description: form.description.trim(), amount: form.amount, category: form.category, date: form.date });
            setForm({ description: '', amount: 0, category: 'Food', date: new Date().toISOString().slice(0, 10) });
            setModalOpen(false);
          }}
        >
          <div>
            <label htmlFor='exp-desc' className='text-xs font-bold text-on-surface/70'>Description</label>
            <input id='exp-desc' required value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder='Dinner at rooftop restaurant' className={inputClass} />
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label htmlFor='exp-amount' className='text-xs font-bold text-on-surface/70'>Amount (USD)</label>
              <input id='exp-amount' type='number' min={0} step='0.01' required value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: Number(e.target.value) }))} className={inputClass} />
            </div>
            <div>
              <label htmlFor='exp-date' className='text-xs font-bold text-on-surface/70'>Date</label>
              <input id='exp-date' type='date' required value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className={inputClass} />
            </div>
          </div>
          <div>
            <label htmlFor='exp-cat' className='text-xs font-bold text-on-surface/70'>Category</label>
            <select id='exp-cat' value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as ExpenseCategory }))} className={inputClass}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button type='submit' className='w-full cursor-pointer rounded-full bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:brightness-110'>Add expense</button>
        </form>
      </Modal>
      {void updateExpense}
    </div>
  );
}


