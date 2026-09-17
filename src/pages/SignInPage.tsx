import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { BrandPanel } from "./BrandPanel";

function SocialButtons() {
  const classes =
    "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-surface-container bg-white px-4 py-3 text-sm font-semibold text-on-surface transition hover:border-primary/40 hover:shadow-level1";
  return (
    <div className="flex gap-3">
      <button className={classes}>
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.2c0-.8-.1-1.6-.2-2.3H12v4.5h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-2 3.2-4.9 3.2-8.2Z" /><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7a7 7 0 0 1-10.4-3.7H1.6v2.8A11.5 11.5 0 0 0 12 23Z" /><path fill="#FBBC05" d="M5.9 13.9a6.9 6.9 0 0 1 0-4.4V6.7H1.6a11.5 11.5 0 0 0 0 10.3l4.3-3.1Z" /><path fill="#EA4335" d="M12 5.1c1.7 0 3.1.6 4.3 1.7l3.2-3.2A11.5 11.5 0 0 0 1.6 6.7l4.3 3.2A6.8 6.8 0 0 1 12 5.1Z" /></svg>
        Google
      </button>
      <button className={classes}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 12.54c0-2.28 1.87-3.38 1.95-3.43-1.06-1.55-2.71-1.76-3.3-1.79-1.4-.14-2.74.83-3.45.83-.72 0-1.81-.81-2.98-.79-1.53.02-2.95.9-3.74 2.27-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.35 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.39 0 1.78.74 2.99.72 1.24-.02 2.02-1.12 2.77-2.23.88-1.28 1.24-2.52 1.26-2.58-.03-.01-2.44-.94-2.48-3.72ZM14.8 5.4c.63-.77 1.06-1.83.94-2.9-.91.04-2.02.61-2.67 1.38-.59.68-1.1 1.76-.96 2.8 1.02.08 2.06-.51 2.69-1.28Z" /></svg>
        Apple Account
      </button>
    </div>
  );
}

export function SignInPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    login({ id: "u_" + Date.now(), name: email.split("@")[0] || "Traveler", email: email || "alex.traveler@example.com" });
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(120deg,#eceafd_0%,#f6ecff_50%,#ffeee6_100%)] p-4 sm:p-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] shadow-level3 lg:grid-cols-[1fr_1.1fr]">
        <BrandPanel />
        <main className="flex flex-col justify-between bg-surface-container-low/50 p-8 sm:p-12">
          <div className="mx-auto w-full max-w-md">
            <div className="flex items-center justify-between text-[11px] font-bold tracking-widest">
              <span className="text-secondary">SECURE ACCESS</span>
              <span className="text-primary">&#9679; Sync: System Active</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-on-surface">Sign In to TripPlanner</h2>
            <p className="mt-2 text-sm text-on-surface/60">Access your saved trips, offline passes, and real-time ledgers.</p>
            <div className="mt-8"><SocialButtons /></div>
            <div className="my-6 flex items-center gap-4 text-[11px] text-on-surface/40">
              <span className="h-px flex-1 bg-outline-variant/40" /> or sign in with email <span className="h-px flex-1 bg-outline-variant/40" />
            </div>
            <form className="space-y-5" onSubmit={handleSignIn}>
              <div>
                <label htmlFor="email" className="text-xs font-bold text-on-surface/70">Email address</label>
                <div className="mt-1.5 flex items-center gap-2.5 rounded-xl border border-surface-container bg-white px-4 py-3 focus-within:border-primary/50">
                  <span className="text-on-surface/40">&#9993;</span>
                  <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex.traveler@example.com" className="w-full bg-transparent text-sm outline-none placeholder:text-on-surface/35" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-bold text-on-surface/70">Password</label>
                  <a href="#" className="text-xs font-semibold text-primary hover:underline">Forgot password?</a>
                </div>
                <div className="mt-1.5 flex items-center gap-2.5 rounded-xl border border-surface-container bg-white px-4 py-3 focus-within:border-primary/50">
                  <span className="text-on-surface/40">&#128274;</span>
                  <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" className="w-full bg-transparent text-sm outline-none placeholder:text-on-surface/35" />
                </div>
              </div>
              <label className="flex cursor-pointer items-center gap-2.5 text-xs font-semibold text-on-surface/70">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="size-4 accent-primary" />
                Remember this device for 30 days
              </label>
              <button type="submit" className="w-full cursor-pointer rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:brightness-110">
                Sign in to Workspace &rarr;
              </button>
              <button type="button" className="w-full cursor-pointer rounded-xl bg-secondary-container/40 py-3 text-sm font-bold text-secondary transition hover:bg-secondary-container/60">
                &#9889; Send Magic Link via Email
              </button>
              <p className="text-center text-sm text-on-surface/60">
                Don&apos;t have an account yet? <Link to="/signup" className="font-bold text-primary hover:underline">Sign Up Free</Link>
              </p>
              <p className="text-center text-[11px] font-semibold text-on-surface/40">&#128274; 256-bit TLS encrypted</p>
            </form>
          </div>
          <nav className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-on-surface/45">
            <a href="#" className="hover:text-on-surface">Offline vault sync ready</a>
            <a href="#" className="hover:text-on-surface">Privacy Policy</a>
            <a href="#" className="hover:text-on-surface">Security Architecture</a>
            <a href="#" className="hover:text-on-surface">Support &amp; Concierge</a>
          </nav>
        </main>
      </div>
    </div>
  );
}
