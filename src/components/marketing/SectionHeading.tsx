export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-bold tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-on-surface/60">{subtitle}</p>}
    </div>
  );
}
