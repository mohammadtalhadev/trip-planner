import { SectionHeading } from "./SectionHeading";

export function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="TRANSPARENT TIERS"
          title="Priced for freedom, not lock-in."
          subtitle="Start free forever. Upgrade only when undertaking serious expeditions."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-surface-container bg-white p-8">
            <p className="text-xs font-bold tracking-widest text-on-surface/50">EXPLORER</p>
            <p className="mt-3 text-4xl font-extrabold text-on-surface">
              $0 <span className="text-sm font-bold text-on-surface/40">/ month</span>
            </p>
            <p className="mt-3 text-sm text-on-surface/60">Essential fluid planning for solo day trips and weekend escapes.</p>
            <ul className="mt-6 space-y-3 text-sm text-on-surface/70">
              {[
                "Up to 2 active trip workspaces",
                "Standard route pacing + map links",
                "Single-currency expense tracking",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <span className="grid size-4 place-items-center rounded-full bg-[#1d7a4f]/10 text-[10px] text-[#1d7a4f]">✓</span>
                  {f}
                </li>
              ))}
              <li className="flex items-center gap-2.5 text-on-surface/35">
                <span className="grid size-4 place-items-center rounded-full bg-surface-container text-[10px]">✕</span>
                Offline vector maps & cached vault
              </li>
            </ul>
            <button className="mt-8 w-full cursor-pointer rounded-full bg-secondary-container/40 py-3 text-sm font-bold text-secondary transition hover:bg-secondary-container/60">
              Get Started Free
            </button>
          </div>
          <div className="relative rounded-3xl border border-primary/30 bg-white p-8 shadow-level3">
            <span className="absolute -top-3 right-8 rounded-full bg-primary px-3.5 py-1.5 text-[10px] font-extrabold tracking-wider text-white shadow-md shadow-primary/30">
              MOST POPULAR
            </span>
            <p className="text-xs font-bold tracking-widest text-primary">NOMAD PRO</p>
            <p className="mt-3 text-4xl font-extrabold text-on-surface">
              $9 <span className="text-sm font-bold text-on-surface/40">/ month • billed annually</span>
            </p>
            <p className="mt-3 text-sm text-on-surface/60">Unconstrained intelligence for serious international travel.</p>
            <ul className="mt-6 space-y-3 text-sm text-on-surface/70">
              {[
                "Unlimited workspaces & collaborator seats",
                "AI Live Weather + Golden Hour telemetry",
                "Zero-fee multi-currency ledger · instant Wise split",
                "Full offline vectors, transit pass QR vault",
                "Social link ingestion (TikTok, IG, Substack)",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] text-primary">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button className="mt-8 w-full cursor-pointer rounded-full bg-[#a2320f] py-3 text-sm font-bold text-white shadow-lg shadow-[#a2320f]/25 transition hover:brightness-110">
              Start 14-Day Free Pro Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
