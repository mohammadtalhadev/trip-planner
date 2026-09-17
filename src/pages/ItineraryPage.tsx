import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTripsStore } from '../store/useTripsStore';
import type { Activity, TripDay } from '../types';
import { ActivityModal } from '../components/itinerary/ActivityModal';
import { ActivityRow } from '../components/itinerary/ActivityRow';
import { EmptyState } from '../components/common/StatusStates';
import { formatDate } from '../utils/format';

interface EditingState {
  dayId: string;
  activity: (Partial<Activity> & { id?: string }) | null;
}

export function ItineraryPage() {
  const { tripId } = useParams();
  const trip = useTripsStore((s) => s.trips.find((t) => t.id === tripId));
  const [editing, setEditing] = useState<EditingState | null>(null);
  const addActivityFn = useTripsStore((s) => s.addActivity);
  const updateActivityFn = useTripsStore((s) => s.updateActivity);
  const deleteActivityFn = useTripsStore((s) => s.deleteActivity);
  const toggleActivityFn = useTripsStore((s) => s.toggleActivity);
  const moveActivityFn = useTripsStore((s) => s.moveActivity);
  const moveActivityToDayFn = useTripsStore((s) => s.moveActivityToDay);
  const addDayFn = useTripsStore((s) => s.addDay);
  const deleteDayFn = useTripsStore((s) => s.deleteDay);

    if (!trip) {
    return <EmptyState icon='🧳' title='Trip not found' hint='It may have been deleted.' />;
  }

  const openAdd = (dayId: string) => setEditing({ dayId, activity: null });
  const openEdit = (dayId: string, activity: Activity) => setEditing({ dayId, activity });

  const handleSave = (data: { time: string; title: string; notes?: string }) => {
    if (!editing) return;
    if (editing.activity?.id) {
      updateActivityFn(trip.id, editing.dayId, editing.activity.id, data);
    } else {
      addActivityFn(trip.id, editing.dayId, data);
    }
  };

  return (
    <div>
      <header className='mb-6 flex flex-wrap items-end justify-between gap-4'>
        <div>
          <p className='text-xs font-bold tracking-widest text-primary'>ITINERARY BUILDER</p>
          <h1 className='text-2xl font-extrabold text-on-surface'>{trip.name}</h1>
          <p className='text-sm text-on-surface/60'>Add, edit, reorder and move activities between days.</p>
        </div>
        <Link to={`/app/trips/${trip.id}`} className='rounded-full bg-white px-4 py-2.5 text-sm font-bold text-secondary shadow-level1'>← Dashboard</Link>
      </header>

      <div className='space-y-5'>
        {trip.days.map((day: TripDay, dayIdx: number) => (
          <section key={day.id} className='rounded-3xl bg-white p-6 shadow-level2 dark:bg-surface-container/60'>
            <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
              <div>
                <h2 className='text-lg font-extrabold text-on-surface'>Day {dayIdx + 1}</h2>
                <p className='text-xs font-semibold text-on-surface/50'>{formatDate(day.date)} · {day.activities.length} activities</p>
              </div>
              <div className='flex items-center gap-2'>
                <button onClick={() => openAdd(day.id)} className='cursor-pointer rounded-full bg-primary px-4 py-2 text-xs font-bold text-white shadow-md shadow-primary/25 transition hover:brightness-110'>+ Add activity</button>
                {trip.days.length > 1 && (
                  <button onClick={() => deleteDayFn(trip.id, day.id)} className='cursor-pointer rounded-full bg-surface-container px-3 py-2 text-xs font-bold text-on-surface/60 transition hover:text-error'>Delete day</button>
                )}
              </div>
            </div>

            {day.activities.length === 0 ? (
              <p className='rounded-2xl border border-dashed border-outline-variant/50 py-8 text-center text-sm text-on-surface/45'>Nothing planned yet — add your first activity for this day.</p>
            ) : (
              <ul className='space-y-2'>
                {day.activities.map((a, i) => (
                  <ActivityRow
                    key={a.id}
                    activity={a}
                    isFirst={i === 0}
                    isLast={i === day.activities.length - 1}
                    onToggle={(id) => toggleActivityFn(trip.id, day.id, id)}
                    onEdit={(act) => openEdit(day.id, act)}
                    onDelete={(id) => deleteActivityFn(trip.id, day.id, id)}
                    onMove={(id, dir) => moveActivityFn(trip.id, day.id, id, dir)}
                  />
                ))}
              </ul>
            )}

            {/* Move activities between days */}
            {day.activities.length > 0 && trip.days.length > 1 && (
              <div className='mt-4 flex flex-wrap items-center gap-2 border-t border-surface-container pt-4'>
                <span className='text-[11px] font-bold text-on-surface/45'>MOVE ALL TO:</span>
                {trip.days.filter((d) => d.id !== day.id).slice(0, 4).map((d, i) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      for (const a of [...day.activities].reverse()) moveActivityToDayFn(trip.id, day.id, d.id, a.id);
                      void i;
                    }}
                    className='cursor-pointer rounded-full border border-surface-container px-3 py-1.5 text-[11px] font-semibold text-on-surface/60 transition hover:border-primary/40 hover:text-primary'
                  >
                    Day {trip.days.indexOf(d) + 1} ({formatDate(d.date)})
                  </button>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      <button onClick={() => addDayFn(trip.id)} className='mt-5 w-full cursor-pointer rounded-3xl border-2 border-dashed border-primary/30 py-4 text-sm font-bold text-primary transition hover:bg-primary/5'>
        + Add another day
      </button>

      <ActivityModal
        open={editing !== null}
        activity={editing?.activity ?? null}
        onClose={() => setEditing(null)}
        onSave={handleSave}
      />
    </div>
  );
}



