import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const PACES = [
  { title: "Relaxed & Mindful", sub: "1-2 curated stops / day", icon: "🍃" },
  { title: "Balanced Flow", sub: "3-4 harmonized stops", icon: "⚖️" },
  { title: "Packed Explorer", sub: "5+ intensive points / day", icon: "🎒" },
];

const VIBES = ["🍴 Michelin & Street Food", "⛩️ Historic Temples", "🏞️ Scenic Nature", "🏛️ Design & Architecture", "🍸 Hidden Speakeasies", "🏨 Boutique Stays"];

export function SignUpPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [pace, setPace] = useState(1);
  const [tags, setTags] = useState<number[]>([0, 1]);
  const [currency, setCurrency] = useState("USD ($)");
  const [metric, setMetric] = useState("Kilometers (km)");
  const [password, setPassword] = useState("\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022");

  const strength = Math.min(4, password.length >= 12 ? 4 : Math.floor(password.length / 3));
  const strengthLabel = strength >= 4 ? "Strong" : strength >= 2 ? "Good" : "Weak";

  const toggleTag = (i: number) => setTags((prev) => (prev.includes(i) ? prev.filter((t) => t !== i) : [...prev, i]));

  const handleComplete = () => {
    login({ id: "u_" + Date.now(), name: "Alex Mercer", email: "alex.mercer@wanderlust.io" });
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(120deg,#eceafd_0%,#f6ecff_50%,#ffeee6_100%)] p-4 sm:p-8">
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-[#c2410c] text-white shadow-md shadow-primary/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </span>
          <div>
            <span className="flex items-center gap-1.5 text-lg font-extrabold tracking-tight text-on-surface">
              TripPlanner <span className="rounded-md bg-secondary/10 px-1.5 py-0.5 text-[10px] font-bold text-secondary">AI STUDIO</span>
            </span>
            <span className="text-[10px] text-on-surface/50">Luminous intelligent journey architect</span>
          </div>
        </Link>
        <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-on-surface/70 shadow-level1 backdrop-blur">
          <span className="grid size-4 place-items-center rounded-full bg-[#1d7a4f] text-[8px] text-white">✓</span>
          Global Route Sync <span className="text-on-surface/40">·</span> 99.8% Calibrated
        </div>
      </header>

      <ol className="mx-auto mt-6 grid max-w-6xl gap-2 sm:grid-cols-3">
        {[
          { step: "STEP 01", label: "Account Basics", state: "done" },
          { step: "CURRENT PHASE", label: "Travel Preferences", state: "active" },
          { step: "STEP 03", label: "First Destination", state: "todo" },
        ].map((s) => (
          <li key={s.label} className={`flex items-center justify-between gap-3 rounded-2xl px-5 py-3.5 ${s.state === "active" ? "border border-primary/40 bg-gradient-to-r from-primary/10 to-primary/5 shadow-level1" : "bg-white/80 shadow-level1"}`}>
            <div className="flex items-center gap-3">
              <span className={`grid size-8 place-items-center rounded-full text-xs font-bold ${s.state === "done" ? "bg-secondary text-white" : s.state === "active" ? "bg-primary text-white" : "bg-surface-container text-on-surface/40"}`}>
                {s.state === "done" ? "✓" : s.state === "active" ? "✍" : "3"}
              </span>
              <div>
                <p className={`text-[9px] font-extrabold tracking-widest ${s.state === "active" ? "text-primary" : "text-on-surface/40"}`}>{s.step}</p>
                <p className="text-sm font-bold text-on-surface">{s.label}</p>
              </div>
            </div>
            {s.state === "done" && <span className="text-xs text-secondary">🔒</span>}
            {s.state === "todo" && <span className="text-xs text-on-surface/30">◎</span>}
          </li>
        ))}
      </ol>

      <div className="mx-auto mt-6 grid max-w-6xl gap-6 lg:grid-cols-[1fr_1.15fr]">
        <section className="rounded-3xl bg-white p-8 shadow-level2">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-extrabold tracking-wider text-primary">✨ FREE FOREVER FOR EXPLORERS</span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-on-surface sm:text-4xl">Create Your Free Account</h1>
          <p className="mt-3 text-sm text-on-surface/60">Start crafting intelligent journeys in minutes. Built for mindful, effortless exploration.</p>
          <div className="mt-6 flex gap-3">
            {[
              { label: "Google", icon: "G" },
              { label: "Apple", icon: "🍎" },
            ].map((p) => (
              <button key={p.label} className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-surface-container bg-surface-container-low/50 py-3 text-sm font-semibold text-on-surface transition hover:border-primary/40">
                <span>{p.icon}</span> {p.label}
              </button>
            ))}
          </div>
          <div className="my-6 flex items-center gap-4 text-[11px] font-semibold text-on-surface/40">
            <span className="h-px flex-1 bg-outline-variant/40" /> OR EMAIL REGISTRATION <span className="h-px flex-1 bg-outline-variant/40" />
          </div>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="fullname" className="text-xs font-bold text-on-surface/70">Full Name</label>
              <div className="mt-1.5 flex items-center gap-2.5 rounded-xl border border-surface-container bg-surface-container-low/50 px-4 py-3 focus-within:border-primary/50">
                <span className="text-on-surface/40">👤</span>
                <input id="fullname" defaultValue="Alex Mercer" className="w-full bg-transparent text-sm outline-none" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-bold text-on-surface/70">Email address</label>
              <div className="mt-1.5 flex items-center gap-2.5 rounded-xl border border-surface-container bg-surface-container-low/50 px-4 py-3 focus-within:border-primary/50">
                <span className="text-on-surface/40">✉️</span>
                <input id="email" type="email" defaultValue="alex.mercer@wanderlust.io" className="w-full bg-transparent text-sm outline-none" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-bold text-on-surface/70">Create a secure password</label>
                <span className="text-[10px] font-bold text-primary">Min 8 chars</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2.5 rounded-xl border border-surface-container bg-surface-container-low/50 px-4 py-3 focus-within:border-primary/50">
                <span className="text-on-surface/40">🔒</span>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent text-sm outline-none" />
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] font-semibold text-on-surface/50">Password Strength</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className={`h-1.5 w-9 rounded-full ${i < strength ? (strength >= 4 ? "bg-[#1d7a4f]" : "bg-primary") : "bg-surface-container"}`} />
                  ))}
                </div>
                <span className="ml-auto text-[10px] font-bold text-[#1d7a4f]">✓ {strengthLabel}</span>
              </div>
            </div>
            <p className="text-xs text-on-surface/50">
              By signing up, you agree to our <a href="#" className="font-semibold text-primary hover:underline">Terms of Service</a> &amp; <a href="#" className="font-semibold text-primary hover:underline">Privacy Policy</a>.
            </p>
          </form>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-surface-container pt-5 text-[11px] font-semibold text-on-surface/50">
            <span>🛡 256-bit Vault</span>
            <span>📴 Offline Cache</span>
            <span>🚫 Zero Ads</span>
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <div className="rounded-3xl bg-white p-8 shadow-level2">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-extrabold text-on-surface">
                  <span className="grid size-7 place-items-center rounded-lg bg-secondary/10 text-sm">⚙️</span>
                  Personalize Your AI Engine
                </h2>
                <p className="mt-1.5 max-w-sm text-xs text-on-surface/55">Curate your travel temperament. Real-time itinerary weights adapt immediately.</p>
              </div>
              <span className="rounded-full bg-secondary/10 px-3 py-1.5 text-[10px] font-bold text-secondary">🧠 Neural Match: 96%</span>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-bold text-on-surface">What is your primary travel pace?</p>
              <span className="text-[10px] font-semibold text-on-surface/40">Custom daily rhythms</span>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {PACES.map((p, i) => (
                <button key={p.title} onClick={() => setPace(i)} className={`relative cursor-pointer rounded-2xl border-2 p-4 text-left transition ${i === pace ? "border-primary bg-primary/5 shadow-level1" : "border-surface-container hover:border-primary/30"}`}>
                  {i === pace && <span className="absolute right-3 top-3 grid size-5 place-items-center rounded-full bg-primary text-[10px] text-white">✓</span>}
                  <span className="text-lg">{p.icon}</span>
                  <p className="mt-2 text-sm font-bold text-on-surface">{p.title}</p>
                  <p className="mt-0.5 text-[11px] text-on-surface/50">{p.sub}</p>
                </button>
              ))}
            </div>
            <div className="mt-7 flex items-center justify-between">
              <p className="text-sm font-bold text-on-surface">Curated Vibe Tags</p>
              <span className="text-[10px] font-semibold text-primary">Select all that apply</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {VIBES.map((v, i) => (
                <button key={v} onClick={() => toggleTag(i)} className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition ${tags.includes(i) ? "border-secondary bg-secondary text-white shadow-md shadow-secondary/25" : "border-surface-container bg-surface-container-low/50 text-on-surface/60 hover:border-secondary/40"}`}>
                  {v} {tags.includes(i) && "✓"}
                </button>
              ))}
            </div>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold text-on-surface/70">Preferred Currency</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["USD ($)", "EUR (€)", "JPY (¥)"].map((c) => (
                    <button key={c} onClick={() => setCurrency(c)} className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[11px] font-semibold transition ${c === currency ? "border-secondary bg-secondary/10 text-secondary" : "border-surface-container text-on-surface/60 hover:border-secondary/40"}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface/70">Distance Metrics</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Kilometers (km)", "Miles (mi)"].map((m) => (
                    <button key={m} onClick={() => setMetric(m)} className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[11px] font-semibold transition ${m === metric ? "border-secondary bg-secondary/10 text-secondary" : "border-surface-container text-on-surface/60 hover:border-secondary/40"}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-secondary/5 to-primary/5 p-6 ring-1 ring-surface-container">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-extrabold text-on-surface">
                <span className="grid size-7 place-items-center rounded-lg bg-primary text-xs text-white">✦</span>
                Predictive Engine Live Feedback
              </h3>
              <span className="text-[10px] font-extrabold tracking-wider text-primary">ACTIVE CALIBRATION</span>
            </div>
            <p className="mt-2 text-xs text-on-surface/60">TripPlanner AI will tailor daily golden-hour alerts and route pacing to your selections.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["⏳ 17:42 Sunset Vantage", "🚶 8 min walking spacing", "📍 Micro-district optimization"].map((chip) => (
                <span key={chip} className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-on-surface/70 shadow-level1">{chip}</span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <footer className="mx-auto mt-6 flex max-w-6xl flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-5 shadow-level2">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-secondary/10 text-secondary">🛡</span>
          <div>
            <p className="text-xs font-bold text-on-surface">Instant Setup Guarantee</p>
            <p className="text-[11px] text-on-surface/50">No credit card required • Cancel anytime</p>
          </div>
        </div>
        <p className="text-sm text-on-surface/60">
          Already have an account? <Link to="/signin" className="font-bold text-primary hover:underline">Sign In</Link>
        </p>
        <button onClick={handleComplete} className="cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:brightness-110">
          Complete Setup &amp; Build First Trip →
        </button>
      </footer>
    </div>
  );
}
