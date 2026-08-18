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
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={onClose} aria-hidden />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 shrink-0 flex-col border-r border-[var(--panel-line)] bg-[var(--panel)] transition-transform duration-200 md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Logo />
          <button
            onClick={onClose}
            className="rounded-md p-1 text-[var(--panel-fg-muted)] hover:bg-white/5 hover:text-[var(--panel-fg)] md:hidden"
            aria-label="Cerrar menú"
          >
            <X size={18} />
          </button>
        </div>

        <p className="px-5 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--panel-fg-muted)]">
          Panel
        </p>
        <nav className="flex-1 space-y-1 px-3">
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
                className={`relative flex w-full items-center gap-2.5 rounded-sm py-2.5 pl-3.5 pr-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/10 text-[var(--panel-fg)]"
                    : "text-[var(--panel-fg-muted)] hover:bg-white/5 hover:text-[var(--panel-fg)]"
                }`}
              >
                {isActive ? (
                  <span
                    className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-[var(--accent)]"
                    aria-hidden
                  />
                ) : null}
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-[var(--panel-line)] px-5 py-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--panel-fg-muted)]">
            Datos locales de este navegador
          </p>
        </div>
      </aside>
    </>
  );
}
