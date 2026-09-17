import { useMemo, useState } from "react";


const REGIONS = [
  { label: "Kyoto, Japan", name: "Kyoto Cultural Discovery", base: 3440, split: [45, 25, 30], rows: ["Ryokan & Boutique Stays", "Rail, Shinkansen & Transit", "Michelin, Street Eats & Tea"] },
  { label: "Amalfi Coast", name: "Amalfi Coastal Discovery", base: 4180, split: [50, 20, 30], rows: ["Cliffside Hotels", "Ferries & Private Drivers", "Seafood & Limoncello"] },
  { label: "Reykjavik", name: "Reykjavik Volcanic Discovery", base: 3890, split: [42, 28, 30], rows: ["Design Hotels", "4x4 Ring Road & Fuel", "Hot Pots & Fine Dining"] },
  { label: "Zermatt", name: "Zermatt Alpine Discovery", base: 4620, split: [55, 22, 23], rows: ["Alpine Chalets", "Cable Cars & Trains", "Fondue & Apres-Ski"] },
] as const;

const SIZES = ["Solo (1)", "Pair (2)", "Squad (4)"] as const;

export function BudgetPlayground() {
  const [region, setRegion] = useState(0);
  const [days, setDays] = useState(10);
  const [size, setSize] = useState(1);

  const current = REGIONS[region];
  const total = useMemo(() => Math.round(((current.base * days) / 10) * (1 + size * 0.35)), [current, days, size]);
  const perTraveler = Math.round(total / (size + 1));
  const amounts = useMemo(() => current.split.map((p) => Math.round((total * p) / 100)), [current, total]);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2rem] border border-white/90 bg-white/70 p-6 shadow-level2 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold tracking-widest text-primary">INTERACTIVE BUDGET PLAYGROUND</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-on-surface">Simulate Your Journey Horizon</h2>
              <p className="mt-3 text-sm text-on-surface/60">
                Adjust destination, trip length, and travel party to see live budget projections modeled on real traveler logs.
              </p>
              <p className="mt-8 text-xs font-bold text-on-surface/70">Select Target Region</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {REGIONS.map((r, i) => (
                  <button
                    key={r.label}
                    onClick={() => setRegion(i)}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition ${
                      i === region ? "border-primary bg-primary/5 text-primary" : "border-surface-container bg-white text-on-surface/60 hover:border-primary/40"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <div className="mt-7 flex items-center justify-between">
                <p className="text-xs font-bold text-on-surface/70">Journey Duration</p>
                <p className="text-sm font-extrabold text-primary">{days} Days</p>
              </div>
              <input type="range" min={3} max={21} value={days} onChange={(e) => setDays(Number(e.target.value))} className="mt-2 w-full accent-primary" aria-label="Journey duration in days" />
              <p className="mt-7 text-xs font-bold text-on-surface/70">Party Size</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {SIZES.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setSize(i)}
                    className={`cursor-pointer rounded-full border px-3 py-2 text-xs font-semibold transition ${
                      i === size ? "border-primary bg-primary text-white shadow-md shadow-primary/25" : "border-surface-container bg-white text-on-surface/60 hover:border-primary/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-surface-container-low bg-surface-container-lowest p-7 shadow-level1">
              <p className="text-[10px] font-bold tracking-widest text-on-surface/40">SIMULATED PROJECTION</p>
              <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-extrabold text-on-surface">{current.name}</h3>
                <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-[10px] font-bold text-secondary">High-Confidence AI</span>
              </div>
              <p className="mt-6 text-xs font-semibold text-on-surface/50">Estimated All-Inclusive Total</p>
              <p className="mt-1 text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
                ${total.toLocaleString()} <span className="text-sm font-bold text-on-surface/40">USD total</span>
              </p>
              <p className="mt-1 text-xs font-semibold text-on-surface/50">(${perTraveler.toLocaleString()} per traveler)</p>
              <ul className="mt-6 space-y-4">
                {current.rows.map((row, i) => (
                  <li key={row}>
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-on-surface/70">
                        {row} <span className="text-on-surface/40">({current.split[i]}%)</span>
                      </span>
                      <span className="text-on-surface">${amounts[i].toLocaleString()}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-container">
                      <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${current.split[i]}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full cursor-pointer rounded-full bg-[#a2320f] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#a2320f]/25 transition hover:brightness-110">
                Instantiate This Itinerary Workspace &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
