import { type ButtonHTMLAttributes } from "react";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  selected?: boolean;
}

export function Chip({ label, selected = false, className = "", ...props }: ChipProps) {
  const base = "px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150";

  const state = selected
    ? "bg-secondary text-on-secondary border border-transparent shadow-sm"
    : "bg-white/50 text-slate-600 border border-white/75 hover:bg-white/70";

  return (
    <button className={`${base} ${state} ${className}`} {...props}>
      {label}
    </button>
  );
}