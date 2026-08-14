import { LayoutDashboard, Package2 } from "lucide-react";
import { Logo } from "./Logo";

export type View = "dashboard" | "products";

interface SidebarProps {
  active: View;
  onNavigate: (view: View) => void;
}

const NAV_ITEMS: { id: View; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Productos", icon: Package2 },
];

export function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="px-5 py-5">
        <Logo />
      </div>
      <nav className="flex-1 space-y-0.5 px-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
