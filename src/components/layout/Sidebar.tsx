import { type ReactNode } from "react";
import { GlassButton } from "../common/GlassButton";

interface NavItem {
  label: string;
  icon: ReactNode;
  active?: boolean;
}

interface SidebarProps {
  items: NavItem[];
  onNewTrip?: () => void;
}

export function Sidebar({ items, onNewTrip }: SidebarProps) {
  return (
    <aside className="w-64 h-screen flex flex-col justify-between bg-white/70 backdrop-blur-[18px] border-r border-white/80 p-4">
      <div>
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary" />
          <span className="font-bold text-lg text-on-surface">TripPlanner</span>
        </div>

        <nav className="flex flex-col gap-1">
          {items.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-secondary-container/40 text-secondary"
                  : "text-on-surface-variant hover:bg-white/50"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <GlassButton variant="primary" onClick={onNewTrip} className="w-full">
        + New Trip
      </GlassButton>
    </aside>
  );
}