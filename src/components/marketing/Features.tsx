const GEMS = [
  { title: "Uproot Tea Room", via: "Via TikTok", img: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=400&q=60" },
  { title: "Arashiyama Pottery", via: "Via TikTok Link", img: "https://images.unsplash.com/photo-1565060169194-19fabf63071c?w=400&q=60" },
  { title: "Bar MarTha Jazz", via: "Via Substack", img: "https://images.unsplash.com/photo-1514320291840-2e0a0bf2a007?w=400&q=60" },
];

export function Features() {
  return (
    <section id="interactive-demo" className="bg-gradient-to-b from-white/60 to-transparent py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-widest text-primary">FLUID TRAVEL ARCHITECTURE</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">
            Engineered for travelers who reject rigid spreadsheets.
          </h2>
          <p className="mt-4 text-on-surface/60">
            Everything your trip requires&mdash;timing, money, navigation, and local intelligence&mdash;coexisting in crystal harmony.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-white/90 bg-white p-8 shadow-level2">
            <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-xl">&#129517;</span>
            <h3 className="mt-5 text-xl font-extrabold text-on-surface">Smart Pacing &amp; Route Telemetry</h3>
            <p className="mt-2 text-sm leading-relaxed text-on-surface/60">
              No more overbooked burnout days. The telemetry engine automatically pairs static transit walks, museum queue-times, and golden-hour windows to suggest the effortless daily cadence.
            </p>
            <div className="mt-6 rounded-2xl bg-surface-container-low/80 p-4">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-on-surface/50">Effort &asymp; Energy Curve (Day 3)</span>
                <span className="text-primary">100% Balanced</span>
              </div>
              <svg viewBox="0 0 300 60" className="mt-3 w-full" fill="none">
                <defs>
                  <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8f8bff" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8f8bff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 45 C 40 20, 70 15, 100 30 S 160 45, 200 25 S 260 40, 300 35" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M0 45 C 40 20, 70 15, 100 30 S 160 45, 200 25 S 260 40, 300 35 V60 H0 Z" fill="url(#curveFill)" />
                <circle cx="100" cy="30" r="4" fill="#ff6b4a" />
              </svg>
              <div className="flex justify-between text-[10px] font-semibold text-on-surface/45">
                <span>09:00 Ginkaku-ji Gate Walk</span>
                <span>13:30 Temple Ascent</span>
                <span>17:45 Riverside Obanzai</span>
              </div>
            </div>
          </article>
          <article className="rounded-3xl border border-white/90 bg-white p-8 shadow-level2">
            <span className="grid size-11 place-items-center rounded-xl bg-secondary-container/50 text-xl">&#128177;</span>
            <h3 className="mt-5 text-xl font-extrabold text-on-surface">Multi-Currency Shared Ledger</h3>
            <p className="mt-2 text-sm leading-relaxed text-on-surface/60">
              Split across JPY, EUR, and USD simultaneously without mental arithmetic. Tap to settle over Wise or Revolut instantly.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                { icon: "&euro;", title: "Shinkansen Green Cars", sub: "Split 3 travelers", amount: "&euro;240.00" },
                { icon: "&yen;", title: "Omakase Dinner", sub: "Paid by Marcus", amount: "&yen;42,800" },
              ].map((row) => (
                <li key={row.title} className="flex items-center gap-4 rounded-2xl border border-surface-container-low bg-surface-container-lowest p-4">
                  <span className="grid size-9 place-items-center rounded-full bg-surface-container text-sm font-bold text-on-surface/60" dangerouslySetInnerHTML={{ __html: row.icon }} />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-on-surface">{row.title}</p>
                    <p className="text-xs text-on-surface/50">{row.sub}</p>
                  </div>
                  <span className="text-sm font-bold text-on-surface" dangerouslySetInnerHTML={{ __html: row.amount }} />
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-white/90 bg-white p-8 shadow-level2">
            <span className="grid size-11 place-items-center rounded-xl bg-tertiary-container/50 text-xl">&#128195;</span>
            <h3 className="mt-5 text-xl font-extrabold text-on-surface">Offline Vault &amp; Travel Wallet</h3>
            <p className="mt-2 text-sm leading-relaxed text-on-surface/60">
              Full offline access to cached vector maps, QR transit passes, boarding documents, and one-tap cellular emergency hotline routes.
            </p>
            <div className="mt-6 flex items-center gap-4 rounded-2xl bg-secondary-container/30 p-4">
              <span className="grid size-10 place-items-center rounded-xl bg-white text-lg shadow-level1">&#127907;</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-secondary">Japan Rail Pass 14-Day</p>
                <p className="text-xs text-secondary/70">Valid &middot; Offline Cached</p>
              </div>
              <span className="text-secondary">&#8615;</span>
            </div>
          </article>
          <article className="rounded-3xl border border-white/90 bg-white p-8 shadow-level2">
            <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-xl">&#128278;</span>
            <h3 className="mt-5 text-xl font-extrabold text-on-surface">Social &amp; Curated Gem Ingestion</h3>
            <p className="mt-2 text-sm leading-relaxed text-on-surface/60">
              Forward TikTok spots, Instagram reels, or Substack guide links directly into your FliBox. Our spatial AI extracts GPS coords, operating hours, and secret menu tips automatically.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {GEMS.map((gem) => (
                <figure key={gem.title} className="overflow-hidden rounded-xl">
                  <div className="h-16 overflow-hidden rounded-lg bg-surface-container">
                    <img src={gem.img} alt="" loading="lazy" className="size-full object-cover" />
                  </div>
                  <figcaption className="mt-1.5 text-[11px] font-bold leading-tight text-on-surface">{gem.title}</figcaption>
                  <p className="text-[10px] text-on-surface/50">{gem.via}</p>
                </figure>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
