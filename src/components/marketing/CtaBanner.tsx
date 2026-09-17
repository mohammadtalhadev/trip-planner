import { useState } from "react";

export function CtaBanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="px-6 pb-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1b1533] via-[#232046] to-[#3a2a4d] px-6 py-20 text-center shadow-level3">
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 size-96 rounded-full bg-secondary/30 blur-3xl" />
        <div className="relative">
          <span className="inline-block rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur">
            Zero friction setup • No downloads required
          </span>
          <h2 className="mx-auto mt-6 max-w-xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready for your next great escape?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/60">
            Join over 85,000 travelers turning scattered screenshots, notes, and group chats into luminous clarity.
          </p>
          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setSubmitted(true);
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded-full border border-white/15 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/40 outline-none backdrop-blur focus:border-primary/60"
            />
            <button
              type="submit"
              className="cursor-pointer rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/40 transition hover:brightness-110"
            >
              {submitted ? "Welcome aboard! ✓" : "Create Free Space"}
            </button>
          </form>
          <p className="mt-4 text-[11px] text-white/40">Takes less than 30 seconds · No credit card required</p>
        </div>
      </div>
    </section>
  );
}
