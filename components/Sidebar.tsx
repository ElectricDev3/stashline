import { LayoutDashboard, Package2, X } from "lucide-react";
import { Logo } from "./Logo";

export type View = "dashboard" | "products";

interface SidebarProps {
  active: View;
  onNavigate: (view: View) => void;
  open: boolean;
  onClose: () => void;
}

const NAV_ITEMS: { id: View; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Productos", icon: Package2 },
];

export function Sidebar({ active, onNavigate, open, onClose }: SidebarProps) {
  return (
    <>
      {open ? (
        <div className="fixed inset-0 z-30 bg-slate-900/30 md:hidden" onClick={onClose} aria-hidden />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white transition-transform duration-200 md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Logo />
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 md:hidden"
            aria-label="Cerrar menú"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 space-y-0.5 px-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-[var(--accent)] text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
