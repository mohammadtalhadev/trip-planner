import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { GeoResult } from '../../types';
import { formatTemp, weatherIcon } from '../../utils/format';
import type { TempUnit } from '../../types';

interface Props {
  destination: GeoResult;
  temperature?: number;
  weatherCode?: number;
  tempUnit: TempUnit;
  saved?: boolean;
  onToggleSave?: (d: GeoResult) => void;
}

/** Memoized so typing in the search box above doesn't re-render every card. */
export const DestinationCard = memo(function DestinationCard({ destination, temperature, weatherCode, tempUnit, saved, onToggleSave }: Props) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/90 bg-white shadow-level2 transition hover:-translate-y-0.5 hover:shadow-level3 dark:bg-surface-container/60">
      <Link to={`/destinations/${destination.id}?lat=${destination.lat}&lon=${destination.lon}&name=${encodeURIComponent(destination.name)}&country=${encodeURIComponent(destination.country)}`} className="block">
        <div className="flex h-28 items-end overflow-hidden bg-gradient-to-br from-secondary-container/60 via-surface-container to-primary/20 p-4">
          <h3 className="text-lg font-extrabold text-on-surface drop-shadow">{destination.name}</h3>
        </div>
      </Link>
      <div className="flex items-center justify-between p-4">
        <div>
          <p className="text-xs font-semibold text-on-surface/50">{destination.country || destination.type || 'Destination'}</p>
          {temperature !== undefined && weatherCode !== undefined && (
            <p className="mt-1 text-sm font-bold text-on-surface">
              {weatherIcon(weatherCode)} {formatTemp(temperature, tempUnit)}
            </p>
          )}
        </div>
        {onToggleSave && (
          <button
            onClick={() => onToggleSave(destination)}
            aria-label={saved ? 'Remove from saved' : 'Save destination'}
            className={`grid size-9 cursor-pointer place-items-center rounded-full text-sm transition ${saved ? 'bg-primary/10 text-primary' : 'bg-surface-container text-on-surface/50 hover:text-primary'}`}
          >
            {saved ? '🔖' : '📎'}
          </button>
        )}
      </div>
    </article>
  );
});
