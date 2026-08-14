import { AlertTriangle, Boxes, DollarSign, PackageX } from "lucide-react";
import { getStockStatus, inventoryValue } from "@/lib/inventory";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/lib/types";
import { STOCK_STATUS_LABELS } from "@/lib/types";
import { StockBadge } from "./ui/Badge";

interface DashboardViewProps {
  products: Product[];
}

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon size={16} />
        <p className="text-xs font-medium uppercase tracking-wide">{label}</p>
      </div>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

export function DashboardView({ products }: DashboardViewProps) {
  const totalUnits = products.reduce((sum, p) => sum + p.quantity, 0);
  const alerts = products.filter((p) => getStockStatus(p) !== "in").sort((a, b) => a.quantity - b.quantity);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Boxes} label="SKUs activos" value={String(products.length)} />
        <StatCard icon={Boxes} label="Unidades totales" value={String(totalUnits)} />
        <StatCard icon={DollarSign} label="Valor de inventario" value={formatCurrency(inventoryValue(products))} />
        <StatCard icon={AlertTriangle} label="Alertas de stock" value={String(alerts.length)} />
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-slate-800">Alertas de reabastecimiento</h2>
        {alerts.length === 0 ? (
          <p className="text-sm text-slate-500">Todo el inventario está por encima de su punto de reorden.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {alerts.map((product) => {
                  const status = getStockStatus(product);
                  return (
                    <tr key={product.id}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {status === "out" ? (
                            <PackageX size={15} className="text-red-500" />
                          ) : (
                            <AlertTriangle size={15} className="text-amber-500" />
                          )}
                          <div>
                            <p className="font-medium text-slate-900">{product.name}</p>
                            <p className="text-xs text-slate-500">{product.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {product.quantity} unidades (punto de reorden: {product.reorderPoint})
                      </td>
                      <td className="px-4 py-3">
                        <StockBadge status={status} label={STOCK_STATUS_LABELS[status]} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
