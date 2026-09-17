import { type ReactNode } from "react";

type Elevation = "level1" | "level2" | "level3";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  elevation?: Elevation;
}

const elevationStyles: Record<Elevation, string> = {
  level1: "bg-white/65 backdrop-blur-[18px] border border-white/80 shadow-level1 rounded-xl",
  level2: "bg-white/82 backdrop-blur-[24px] border border-white/95 shadow-level2 rounded-xl",
  level3: "bg-white/92 backdrop-blur-[32px] border-[1.5px] border-white shadow-level3 rounded-xl",
};

export function GlassCard({ children, className = "", elevation = "level1" }: GlassCardProps) {
  return (
    <div className={`${elevationStyles[elevation]} p-6 ${className}`}>
      {children}
    </div>
  );
}