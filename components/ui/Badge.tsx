import type { StockStatus } from "@/lib/types";

// "En stock" stays deliberately quiet — urgency color is reserved for the
// two states that actually need attention, so low/out read instantly.
const STATUS_STYLE: Record<StockStatus, { bg: string; fg: string }> = {
  in: { bg: "var(--paper-line)", fg: "var(--foreground)" },
  low: { bg: "var(--status-low-bg)", fg: "var(--status-low)" },
  out: { bg: "var(--status-out-bg)", fg: "var(--status-out)" },
};

export function StockBadge({ status, label }: { status: StockStatus; label: string }) {
  const style = STATUS_STYLE[status];
  return (
    <span
      className="inline-flex items-center rounded-sm px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
      style={{ background: style.bg, color: style.fg }}
    >
      {label}
    </span>
  );
}
