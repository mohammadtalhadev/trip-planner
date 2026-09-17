import { useEffect, useState } from 'react';
import type { Activity } from '../../types';
import { Modal } from '../common/Modal';

interface Props {
  open: boolean;
  activity: (Partial<Activity> & { id?: string }) | null;
  onClose: () => void;
  onSave: (data: { time: string; title: string; notes?: string }) => void;
}

const inputClass = 'mt-1.5 w-full rounded-xl border border-surface-container bg-surface-container-low/50 px-4 py-3 text-sm outline-none focus:border-primary/50';

export function ActivityModal({ open, activity, onClose, onSave }: Props) {
  const [time, setTime] = useState('09:00');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (activity) {
      setTime(activity.time ?? '09:00');
      setTitle(activity.title ?? '');
      setNotes(activity.notes ?? '');
    } else {
      setTime('09:00');
      setTitle('');
      setNotes('');
    }
  }, [activity]);

  return (
    <Modal open={open} title={activity?.id ? 'Edit activity' : 'Add activity'} onClose={onClose}>
      <form
        className='space-y-4'
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim()) return;
          onSave({ time, title: title.trim(), notes: notes.trim() || undefined });
          onClose();
        }}
      >
        <div className='grid grid-cols-[100px_1fr] gap-3'>
          <div>
            <label htmlFor='act-time' className='text-xs font-bold text-on-surface/70'>Time</label>
            <input id='act-time' type='time' required value={time} onChange={(e) => setTime(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor='act-title' className='text-xs font-bold text-on-surface/70'>Activity</label>
            <input id='act-title' required value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Hagia Sophia' className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor='act-notes' className='text-xs font-bold text-on-surface/70'>Notes</label>
          <textarea id='act-notes' value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder='Tickets, reservations, tips…' className={inputClass} />
        </div>
        <button type='submit' className='w-full cursor-pointer rounded-full bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:brightness-110'>
          {activity?.id ? 'Save changes' : 'Add activity'}
        </button>
      </form>
    </Modal>
  );
}

