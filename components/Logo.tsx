import { Boxes } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-[var(--accent)] text-white">
        <Boxes size={17} strokeWidth={2.25} />
      </div>
      <div className="leading-tight">
        <p className="font-display text-base font-bold uppercase tracking-wide text-[var(--panel-fg)]">Stashline</p>
        <p className="text-[11px] tracking-wide text-[var(--panel-fg-muted)]">Control de inventario</p>
      </div>
    </div>
  );
}
