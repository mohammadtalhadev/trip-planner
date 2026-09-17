import { SectionHeading } from "./SectionHeading";

const TESTIMONIALS = [
  {
    quote:
      "The pacing engine completely saved our trip across Japan. Instead of scrambling between 7 temples in one morning, it spaced out golden hour moments and saved us hours of backtracking.",
    name: "Sarah Jenkins",
    meta: "Tokyo → Kyoto + 9 Days",
    color: "bg-secondary",
  },
  {
    quote:
      "Splitting costs between four friends across three currencies usually turns into group dinner math. TripPlanner handled the Yen and Euro conversion in the background without a single awkward debate.",
    name: "Matteo Varma",
    meta: "Amalfi → Cinque Terre + 9 Days",
    color: "bg-tertiary",
  },
  {
    quote:
      "When a blizzard shut down roads in the highlands of Iceland, the offline telemetry dynamically re-routed our campervan to some thermal pools. It felt like having a local avoidance agent on call 24/7.",
    name: "Linnea Lindström",
    meta: "Reykjavik Ring Road + 12 Days",
    color: "bg-primary",
  },
];

export function Testimonials() {
  return (
    <section id="field-reports" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="FIELD REPORTS"
          title="Journeys elevated by clarity."
          subtitle="Real logs from nomadic professionals, couple adventurers, and multi-country explorers."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-3xl border border-white/90 bg-white p-7 shadow-level2">
              <span className="text-sm text-primary" aria-label="5 stars">★★★★★</span>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-on-surface/70">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-surface-container pt-5">
                <span className={`grid size-10 place-items-center rounded-full text-xs font-bold text-white ${t.color}`}>
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <p className="text-sm font-bold text-on-surface">{t.name}</p>
                  <p className="text-xs text-on-surface/50">{t.meta}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
