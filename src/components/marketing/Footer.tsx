const FOOTER_COLS = [
  { title: "PRODUCT", links: ["Features", "Route telemetry", "Spot Ledger", "Offline Vault", "Destination Guides", "Mobile App"] },
  { title: "RESOURCES", links: ["Community itineraries", "Travel Journal", "Documentation", "API Status", "Currency Matrix"] },
  { title: "COMPANY", links: ["About Us", "Careers", "Press & Media", "Manifesto", "Sustainability"] },
  { title: "LEGAL & PRIVACY", links: ["Privacy Policy", "Terms of Service", "Security Architecture", "Cookie Settings"] },
];

export function Footer() {
  return (
    <footer className="bg-[#101322] px-6 pb-10 pt-16 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-[#c2410c] text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </span>
            <div>
              <p className="font-extrabold">TripPlanner</p>
              <p className="text-[10px] tracking-wider text-white/40">AI STUDIO • FLUID TRAVEL</p>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
            Liquid intelligence for mindful, effortless exploration. Synthesizing pacing telemetry, multi-currency
            ledgers, and curated local gems into crystal harmony.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/60">
            <span className="size-1.5 rounded-full bg-[#34d399]" /> All Systems Operational • Route Sync v3.4 Active
          </p>
          <div className="mt-6 flex gap-2">
            {["𝕏", "in", "▶", "◎"].map((s) => (
              <span key={s} className="grid size-9 cursor-pointer place-items-center rounded-full bg-white/5 text-sm text-white/60 transition hover:bg-white/10">
                {s}
              </span>
            ))}
          </div>
        </div>
        {FOOTER_COLS.map((col) => (
          <nav key={col.title}>
            <p className="text-[11px] font-bold tracking-widest text-white/40">{col.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="transition hover:text-white">{l}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto mt-14 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40">
        <p>© 2025 TripPlanner AI Technologies Inc. All rights reserved.</p>
        <div className="flex gap-5">
          <span>🌐 English (US)</span>
          <span>💱 USD ($)</span>
        </div>
      </div>
    </footer>
  );
}
