import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const NAV_ITEMS = [
  { to: '/app', label: 'Dashboard', icon: '🧭', end: true },
  { to: '/app/trips', label: 'Trips', icon: '🧳' },
  { to: '/app/saved', label: 'Saved Places', icon: '🔖' },
  { to: '/app/settings', label: 'Settings', icon: '⚙️' },
];

export function Sidebar() {
  const { user, logout } = useAuthStore();
  return (
    <aside className="flex h-screen w-64 flex-col justify-between border-r border-white/80 bg-white/70 p-4 backdrop-blur-[18px] dark:border-white/10 dark:bg-surface-container/40">
      <div>
        <div className="mb-8 flex items-center gap-2 px-2">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-[#c2410c] text-white shadow-md shadow-primary/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </span>
          <span className="text-lg font-extrabold text-on-surface">TripPlanner</span>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end as boolean | undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-secondary-container/40 text-secondary dark:text-secondary-container' : 'text-on-surface-variant hover:bg-white/50 dark:hover:bg-white/10'
                }`
              }
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      {user && (
        <div className="rounded-2xl bg-white/60 p-3 dark:bg-white/10">
          <p className="truncate text-sm font-bold text-on-surface">{user.name}</p>
          <p className="mb-3 truncate text-xs text-on-surface/50">{user.email}</p>
          <button onClick={logout} className="w-full cursor-pointer rounded-full border border-outline-variant py-2 text-xs font-bold text-on-surface/70 transition hover:bg-white dark:hover:bg-white/10">
            Sign Out
          </button>
        </div>
      )}
    </aside>
  );
}
