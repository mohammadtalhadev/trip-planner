import { Link } from "react-router-dom";

const STATS = [
  { value: "85,000+", label: "Active Itineraries" },
  { value: "142", label: "Connected Regions" },
  { value: "99.98%", label: "Vault Uptime" },
];

export function BrandPanel() {
  return (
    <aside className="hidden flex-col justify-between bg-white p-10 lg:flex">
      <div>
        <Link to="/" className="inline-flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-[#c2410c] text-white shadow-md shadow-primary/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </span>
          <span className="text-lg font-extrabold tracking-tight text-on-surface">TripPlanner</span>
          <span className="rounded-md bg-secondary/10 px-2 py-0.5 text-[10px] font-bold text-secondary">PRO</span>
        </Link>
        <p className="mt-1.5 text-xs text-on-surface/50">Luminous intelligent journey architect</p>
        <h1 className="mt-10 text-3xl font-extrabold leading-tight tracking-tight text-on-surface">
          Welcome back to your next journey.
        </h1>
        <p className="mt-3 max-w-sm text-sm text-on-surface/60">
          Pick up right where you paused. Offline tickets, currency caches, and synchronized itineraries await.
        </p>
        <div className="relative mt-8 overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=70"
            alt="Kyoto bamboo grove"
            className="h-52 w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-extrabold text-white">⏳ GOLDEN HOUR ACTIVE</span>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-white/70">UPCOMING ROUTE</p>
              <p className="text-lg font-extrabold">Kyoto & Arashiyama Pass</p>
            </div>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">Day 1 of 7</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-surface-container-low bg-surface-container-low/60 p-4">
          <span className="grid size-9 place-items-center rounded-full bg-secondary/10 text-secondary">🚆</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-on-surface">Sagano Scenic Railway</p>
            <p className="text-xs text-on-surface/50">Confirmed · 08:45 AM JST</p>
          </div>
          <span className="grid size-5 place-items-center rounded-full bg-[#1d7a4f] text-[10px] text-white">✓</span>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-surface-container-low/60 p-4">
          <div className="flex -space-x-2">
            {["bg-primary", "bg-secondary", "bg-tertiary"].map((c, i) => (
              <span key={i} className={`grid size-8 place-items-center rounded-full border-2 border-white text-[9px] font-bold text-white ${c}`}>
                {["EM", "MH", "SL"][i]}
              </span>
            ))}
          </div>
          <p className="text-xs text-on-surface/60">
            <strong className="text-on-surface">Zürich!</strong> Offline sync saved our flight connection in
          </p>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-4 border-t border-surface-container pt-6">
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="text-xl font-extrabold text-on-surface">{s.value}</p>
            <p className="text-[11px] text-on-surface/50">{s.label}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
