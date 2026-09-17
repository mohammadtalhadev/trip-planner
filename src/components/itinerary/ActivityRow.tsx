import { memo } from 'react';
import type { Activity } from '../../types';

interface Props {
  activity: Activity;
  isFirst: boolean;
  isLast: boolean;
  onToggle: (id: string) => void;
  onEdit: (a: Activity) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, dir: 'up' | 'down') => void;
}

/**
 * Memoized: typing in the "add activity" form or toggling one row must not
 * re-render every other row in the day (render-behavior requirement).
 */
export const ActivityRow = memo(function ActivityRow({ activity, isFirst, isLast, onToggle, onEdit, onDelete, onMove }: Props) {
  return (
    <li className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition ${activity.completed ? 'bg-surface-container-low/60' : 'bg-white dark:bg-white/5'}`}>
      <button
        onClick={() => onToggle(activity.id)}
        aria-label={activity.completed ? 'Mark as not completed' : 'Mark as completed'}
        className={`grid size-5 shrink-0 cursor-pointer place-items-center rounded-full border-2 text-[10px] transition ${activity.completed ? 'border-[#1d7a4f] bg-[#1d7a4f] text-white' : 'border-outline-variant text-transparent hover:border-primary'}`}
      >
        ✓
      </button>
      <span className={`shrink-0 text-sm font-extrabold ${activity.completed ? 'text-on-surface/35 line-through' : 'text-primary'}`}>{activity.time}</span>
      <div className='min-w-0 flex-1'>
        <p className={`truncate text-sm font-bold ${activity.completed ? 'text-on-surface/40 line-through' : 'text-on-surface'}`}>{activity.title}</p>
        {activity.notes && <p className='truncate text-xs text-on-surface/50'>{activity.notes}</p>}
      </div>
      <div className='flex shrink-0 items-center gap-1'>
        <button onClick={() => onMove(activity.id, 'up')} disabled={isFirst} aria-label='Move up' className='grid size-7 cursor-pointer place-items-center rounded-lg text-xs text-on-surface/50 transition hover:bg-surface-container disabled:opacity-30'>↑</button>
        <button onClick={() => onMove(activity.id, 'down')} disabled={isLast} aria-label='Move down' className='grid size-7 cursor-pointer place-items-center rounded-lg text-xs text-on-surface/50 transition hover:bg-surface-container disabled:opacity-30'>↓</button>
        <button onClick={() => onEdit(activity)} aria-label='Edit activity' className='grid size-7 cursor-pointer place-items-center rounded-lg text-xs text-on-surface/50 transition hover:bg-surface-container'>✎</button>
        <button onClick={() => onDelete(activity.id)} aria-label='Delete activity' className='grid size-7 cursor-pointer place-items-center rounded-lg text-xs text-on-surface/50 transition hover:bg-error/10 hover:text-error'>🗑</button>
      </div>
    </li>
  );
});
