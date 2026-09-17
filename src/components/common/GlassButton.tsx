import type { ButtonHTMLAttributes, ReactNode } from "react";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  children: ReactNode;
}

export function GlassButton({ variant = "primary", children, className = "", ...rest }: GlassButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer";
  const variants = {
    primary: "bg-primary text-on-primary hover:brightness-110 shadow-md shadow-primary/25",
    ghost: "bg-white/60 text-secondary backdrop-blur border border-white/80 hover:bg-white",
    outline: "border border-outline-variant text-on-surface hover:bg-white/60",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
