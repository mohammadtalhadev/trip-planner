const TIMELINE = [
  { time: "09:30 AM", title: "Fushimi Inari Taisha", note: "Low crowd density score · 4.2K tranquility peak", meta: "4,210 steps", tone: "bg-primary" },
  { time: "12:15 PM", title: "Gion Duck Noodles", note: "Bamboo booths infused with Kitsune peel", meta: "Reserved #24", tone: "bg-secondary" },
  { time: "16:45 PM", title: "Kyomizu-dera Veranda", note: "Optimal sunset frame angle · 242° WSW", meta: "Golden Light", tone: "bg-tertiary" },
];

export function ProductPreview() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 pb-24 md:px-6">
      <div className="overflow-hidden rounded-3xl border border-white/90 bg-white shadow-level3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-container-low px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="hidden gap-1.5 sm:flex">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <p className="text-sm font-bold text-on-surface">
              Autumn Sanctuary • Kyoto <span className="mx-1 text-on-surface/30">→</span> Tokyo{" "}
              <span className="font-normal text-on-surface/50">(Day 4 of 10)</span>
            </p>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-3 py-1.5 text-xs font-semibold text-secondary">☀️ Golden Hour 17:14</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-3 py-1.5 text-xs font-semibold text-secondary">⟳ Live Sync</span>
          </div>
        </div>
        <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.05fr_0.9fr_0.85fr]">
          <div className="rounded-2xl border border-surface-container-low bg-surface-container-lowest p-5">
            <p className="text-[10px] font-bold tracking-widest text-on-surface/40">TRANSIT TELEMETRY</p>
            <h3 className="mt-1 text-lg font-extrabold text-on-surface">Kyoto • Higashiyama District</h3>
            <ul className="mt-4 space-y-4">
              {TIMELINE.map((item) => (
                <li key={item.time} className="flex gap-3">
                  <span className={`mt-1.5 size-2.5 shrink-0 rounded-full ${item.tone}`} />
                  <div className="flex-1 border-b border-dashed border-surface-container pb-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm font-bold text-on-surface">
                        <span className="text-primary">{item.time}</span> {item.title}
                      </p>
                      <span className="shrink-0 text-[10px] font-semibold text-on-surface/40">{item.meta}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-on-surface/55">{item.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative min-h-52 flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-tertiary-container/60 via-surface-container to-secondary-container/50">
              <svg className="absolute inset-0 size-full opacity-40" viewBox="0 0 300 220" fill="none" preserveAspectRatio="none">
                <path d="M20 180 C 80 150, 120 120, 160 60 S 250 30, 285 20" stroke="#ff6b4a" strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round" />
                <path d="M0 80 C 60 90, 140 70, 300 110" stroke="#8f8bff" strokeWidth="1.5" />
                <path d="M40 0 C 50 60, 90 160, 60 220" stroke="#8d99ff" strokeWidth="1.5" />
              </svg>
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-on-surface/60 shadow">ACTIVE WAYPOINT</div>
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 p-3 shadow-level2">
                <p className="text-sm font-extrabold text-on-surface">Kyoto Central Loop</p>
                <span className="mt-1 inline-block rounded-full bg-surface-container px-2 py-0.5 text-[10px] font-semibold text-on-surface/60">2.4 km Total</span>
              </div>
            </div>
            <div className="rounded-2xl border border-surface-container-low bg-surface-container-lowest p-4">
              <p className="text-[10px] font-bold tracking-widest text-primary">SECRET TIMING</p>
              <p className="mt-1 text-sm font-bold text-on-surface">Tenju-an Sogenchi Garden</p>
              <p className="mt-0.5 text-xs text-on-surface/55">Arrive before 08:45 AM for mirror-pool</p>
            </div>
          </div>

          <div className="rounded-2xl border border-surface-container-low bg-surface-container-lowest p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold tracking-widest text-on-surface/40">SHARED POOL</p>
              <span className="rounded-full bg-[#e7f6ee] px-2.5 py-1 text-[10px] font-bold text-[#1d7a4f]">Safe Margin</span>
            </div>
            <p className="mt-3 text-3xl font-extrabold tracking-tight text-on-surface">¥184,200</p>
            <p className="mt-1 text-xs font-medium text-on-surface/50">≈ $1,240 USD Shared Ledger</p>
            <div className="mt-4">
              <div className="flex justify-between text-[10px] font-semibold text-on-surface/50">
                <span>Daily burn velocity</span>
                <span className="text-primary">66% allocated</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-container">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-primary to-[#ffb199]" />
              </div>
            </div>
            <ul className="mt-5 divide-y divide-surface-container">
              {[
                { name: "Elena R.", amount: "¥61,400" },
                { name: "Marcus T.", amount: "¥61,400" },
                { name: "You", amount: "¥61,400" },
              ].map((m) => (
                <li key={m.name} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="font-semibold text-on-surface/70">{m.name}</span>
                  <span className="font-bold text-on-surface">{m.amount}</span>
                </li>
              ))}
            </ul>
            <button className="mt-4 w-full cursor-pointer rounded-full bg-secondary-container/50 py-2.5 text-xs font-bold text-secondary transition hover:bg-secondary-container/70">
              Instant Wise Settle
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-surface-container-low bg-surface-container-low/60 px-6 py-3.5 text-xs font-semibold text-on-surface/60">
          <span className="flex items-center gap-2">☁️ <strong className="text-on-surface">10°C</strong> Crisp & Calm Sky</span>
          <span>UV 2 · Low</span>
        </div>
      </div>
    </section>
  );
}

