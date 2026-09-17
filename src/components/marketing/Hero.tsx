import { Link } from "react-router-dom";

const AVATAR_COLORS = ["bg-secondary", "bg-tertiary", "bg-primary", "bg-on-surface/60"];

function PressLogos() {
  const logos = [
    <span key="cn" className="tracking-[0.2em] text-[11px] font-bold leading-tight text-center">CONDE<br />NAST</span>,
    <span key="w" className="font-black text-sm tracking-widest">WIRED</span>,
    <span key="f" className="font-extrabold text-[11px] leading-tight text-center">FAST<br />COMPANY</span>,
    <span key="p" className="font-extrabold text-[11px] leading-tight text-center text-primary">#1 PRODUCT<br />HUNT</span>,
  ];
  return (
    <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 text-on-surface/40">
      {logos.map((logo, i) => (
        <div key={i} className="flex items-center gap-10">
          {i > 0 && <span className="hidden h-6 w-px bg-on-surface/10 md:block" />}
          {logo}
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-16 pb-8 text-center md:pt-24">
      <Link
        to="/signup"
        className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-1.5 text-xs font-semibold text-secondary shadow-level1 transition hover:shadow-level2"
      >
        <span aria-hidden>✨</span> Introducing TripPlanner AI 2.0 + Fluid Travel Intelligence <span aria-hidden>→</span>
      </Link>
      <h1 className="mt-8 text-4xl font-extrabold leading-[1.1] tracking-tight text-on-surface sm:text-5xl md:text-6xl">
        Plan Unforgettable Journeys with{" "}
        <span className="text-primary">Liquid Precision.</span>
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-on-surface/60 md:text-lg">
        The AI-powered travel planner that synthesizes route pacing, live weather telemetry, shared multi-currency
        ledgers, and curated local gems into one luminous workspace.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 rounded-full bg-[#a2320f] px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#a2320f]/25 transition hover:brightness-110"
        >
          Start Planning Free — No Credit Card <span aria-hidden>⇢</span>
        </Link>
        <a
          href="#interactive-demo"
          className="inline-flex items-center gap-2 rounded-full bg-secondary-container/40 px-6 py-3.5 text-sm font-bold text-secondary transition hover:bg-secondary-container/60"
        >
          <span className="grid size-5 place-items-center rounded-full bg-secondary text-white">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          </span>
          Explore Interactive Demo
        </a>
      </div>
      <div className="mt-10 flex items-center justify-center gap-3">
        <div className="flex -space-x-2.5">
          {AVATAR_COLORS.map((c, i) => (
            <span key={i} className={`grid size-9 place-items-center rounded-full border-2 border-white text-[10px] font-bold text-white ${c}`}>
              {["SJ", "MV", "LL", "+9k"][i]}
            </span>
          ))}
        </div>
        <div className="text-left">
          <div className="text-sm text-primary" aria-label="5 stars">★★★★★</div>
          <p className="text-xs font-medium text-on-surface/60">Loved by 85,000+ modern travelers</p>
        </div>
      </div>
      <PressLogos />
    </section>
  );
}
