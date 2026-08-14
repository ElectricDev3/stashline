import { Package } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-[var(--accent)] text-white">
        <Package size={16} strokeWidth={2.25} />
      </div>
      <div className="leading-tight">
        <p className="font-display text-sm font-bold uppercase tracking-wide text-[var(--foreground)]">Stashline</p>
        <p className="text-xs text-slate-400">Control de inventario</p>
      </div>
    </div>
  );
}
