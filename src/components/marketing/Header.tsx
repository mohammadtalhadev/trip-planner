import { useState } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = ["Features", "Interactive Demo", "Pricing", "Field Reports"];

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-[#c2410c] text-white shadow-md shadow-primary/30">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      </span>
      <span className="text-lg font-extrabold tracking-tight text-on-surface">TripPlanner</span>
      {!compact && (
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">v4.2.0</span>
      )}
    </Link>
  );
}

export function MarketingHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-4 z-50 mx-auto w-[min(96%,76rem)]">
      <div className="flex items-center justify-between rounded-full border border-white/80 bg-white/85 py-2 pl-4 pr-2 shadow-level2 backdrop-blur-xl">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-on-surface/70 transition hover:bg-surface-container-low hover:text-on-surface"
            >
              {link}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/signin" className="hidden rounded-full px-4 py-2 text-sm font-semibold text-on-surface/80 transition hover:bg-surface-container-low sm:block">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="hidden rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-on-primary shadow-lg shadow-primary/30 transition hover:brightness-110 sm:inline-flex"
          >
            Start Planning Free <span aria-hidden>→</span>
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full text-on-surface lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="mx-2 mt-2 flex flex-col gap-1 rounded-3xl border border-white/80 bg-white/95 p-3 shadow-level2 backdrop-blur-xl lg:hidden">
          {NAV_LINKS.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`} className="rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-surface-container-low" onClick={() => setOpen(false)}>
              {link}
            </a>
          ))}
          <Link to="/signin" className="rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-surface-container-low">
            Sign In
          </Link>
          <Link to="/signup" className="rounded-full bg-primary px-4 py-2.5 text-center text-sm font-bold text-on-primary">
            Start Planning Free
          </Link>
        </div>
      )}
    </header>
  );
}
