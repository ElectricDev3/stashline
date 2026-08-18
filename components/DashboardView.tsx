import { AlertTriangle, Boxes, CircleGauge, DollarSign, PackageX } from "lucide-react";
import { atRiskValue, getStockStatus, inventoryValue } from "@/lib/inventory";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/lib/types";
import { STOCK_STATUS_LABELS } from "@/lib/types";

interface DashboardViewProps {
  products: Product[];
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone = "neutral",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  tone?: "neutral" | "risk";
}) {
  return (
    <div
      className={`relative min-w-0 overflow-hidden rounded-sm border bg-white pl-4 pr-3 py-4 ${
        tone === "risk" ? "border-[var(--status-low)]/30" : "border-[var(--paper-line)]"
      }`}
    >
      <span
        className={`absolute inset-y-0 left-0 w-1 ${tone === "risk" ? "bg-[var(--status-low)]" : "bg-[var(--accent)]"}`}
        aria-hidden
      />
      <div className="flex items-center gap-2 text-slate-500">
        <Icon size={15} strokeWidth={2} className="shrink-0" />
        <p className="text-[11px] font-semibold uppercase leading-tight tracking-[0.1em]">{label}</p>
      </div>
      <p className="tabular-nums mt-2 truncate font-mono text-lg font-semibold text-[var(--ink)]">{value}</p>
    </div>
  );
}

export function DashboardView({ products }: DashboardViewProps) {
  const totalUnits = products.reduce((sum, p) => sum + p.quantity, 0);
  const alerts = products.filter((p) => getStockStatus(p) !== "in").sort((a, b) => a.quantity - b.quantity);
  const risk = atRiskValue(products);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        <StatCard icon={Boxes} label="SKUs activos" value={String(products.length)} />
        <StatCard icon={CircleGauge} label="Unidades totales" value={String(totalUnits)} />
        <StatCard icon={DollarSign} label="Valor de inventario" value={formatCurrency(inventoryValue(products))} />
        <StatCard
          icon={AlertTriangle}
          label="Valor en riesgo"
          value={formatCurrency(risk)}
          tone={risk > 0 ? "risk" : "neutral"}
        />
        <StatCard icon={PackageX} label="Alertas de stock" value={String(alerts.length)} tone={alerts.length > 0 ? "risk" : "neutral"} />
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[var(--ink)]">
            Alertas de reabastecimiento
          </h2>
          <span className="font-mono text-xs text-slate-400">{alerts.length} de {products.length} SKUs</span>
        </div>
        {alerts.length === 0 ? (
          <div className="rounded-sm border border-dashed border-[var(--paper-line)] bg-white/60 px-5 py-8 text-center">
            <p className="text-sm text-slate-500">Todo el inventario está por encima de su punto de reorden.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {alerts.map((product) => {
              const status = getStockStatus(product);
              const isOut = status === "out";
              const stripeColor = isOut ? "var(--status-out)" : "var(--status-low)";
              return (
                <div
                  key={product.id}
                  className="relative flex flex-col gap-2 overflow-hidden rounded-sm border border-[var(--paper-line)] bg-white py-3 pl-4 pr-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: stripeColor }} aria-hidden />
                  <div className="flex items-center gap-2.5">
                    {isOut ? (
                      <PackageX size={16} style={{ color: stripeColor }} />
                    ) : (
                      <AlertTriangle size={16} style={{ color: stripeColor }} />
                    )}
                    <div>
                      <p className="font-medium text-[var(--ink)]">{product.name}</p>
                      <p className="font-mono text-xs text-slate-500">{product.sku}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pl-6 sm:pl-0">
                    <p className="tabular-nums font-mono text-sm text-slate-600">
                      {product.quantity} / {product.reorderPoint} u.
                    </p>
                    <span
                      className="inline-flex items-center rounded-sm px-2 py-1 text-[11px] font-semibold uppercase tracking-wide"
                      style={{ background: isOut ? "var(--status-out-bg)" : "var(--status-low-bg)", color: stripeColor }}
                    >
                      {STOCK_STATUS_LABELS[status]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
