import type { StockStatus } from "@/lib/types";

const STATUS_CLASSES: Record<StockStatus, string> = {
  in: "bg-emerald-100 text-emerald-700",
  low: "bg-amber-100 text-amber-700",
  out: "bg-red-100 text-red-700",
};

export function StockBadge({ status, label }: { status: StockStatus; label: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CLASSES[status]}`}
    >
      {label}
    </span>
  );
}
