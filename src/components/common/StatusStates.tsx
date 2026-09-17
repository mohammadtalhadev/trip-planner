import type { ReactNode } from 'react';

export function Spinner({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-block size-6 animate-spin rounded-full border-[3px] border-primary/20 border-t-primary ${className}`} role="status" aria-label="Loading" />
  );
}

export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/70 py-14 text-on-surface/50 shadow-level1 dark:bg-surface-container/40">
      <Spinner />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}

export function SkeletonCards({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-3xl bg-white/80 p-5 shadow-level1 dark:bg-surface-container/40">
          <div className="h-28 rounded-2xl bg-surface-container" />
          <div className="mt-4 h-4 w-2/3 rounded-full bg-surface-container" />
          <div className="mt-2 h-4 w-1/2 rounded-full bg-surface-container" />
        </div>
      ))}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message?: string | null; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-error/20 bg-error/5 py-14 text-center dark:bg-error/10">
      <span className="text-3xl">⚠️</span>
      <p className="font-bold text-on-surface">Something went wrong</p>
      <p className="max-w-sm text-sm text-on-surface/60">{message ?? 'We could not load this section.'}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-1 cursor-pointer rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-md shadow-primary/25 transition hover:brightness-110">
          Try Again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ icon = '🧭', title, hint, children }: { icon?: string; title: string; hint?: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-surface-container bg-white/70 py-14 text-center dark:bg-surface-container/40">
      <span className="text-4xl">{icon}</span>
      <p className="font-bold text-on-surface">{title}</p>
      {hint && <p className="max-w-sm text-sm text-on-surface/55">{hint}</p>}
      {children}
    </div>
  );
}
