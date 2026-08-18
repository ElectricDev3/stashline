"use client";

import { useMemo, useState } from "react";
import { Minus, Package2, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "./ui/Button";
import { InputField, SelectField } from "./ui/Field";
import { StockBadge } from "./ui/Badge";
import { EmptyState } from "./ui/EmptyState";
import { ProductModal } from "./ProductModal";
import { getStockStatus, uniqueCategories } from "@/lib/inventory";
import { formatCurrency } from "@/lib/format";
import { STOCK_STATUS_LABELS, type Product, type StockStatus } from "@/lib/types";

const STRIPE_COLOR: Record<StockStatus, string> = {
  in: "var(--paper-line)",
  low: "var(--status-low)",
  out: "var(--status-out)",
};

interface ProductsViewProps {
  products: Product[];
  onCreate: (product: Product) => void;
  onUpdate: (product: Product) => void;
  onDelete: (id: string) => void;
  onAdjustQuantity: (id: string, delta: number) => void;
}

export function ProductsView({ products, onCreate, onUpdate, onDelete, onAdjustQuantity }: ProductsViewProps) {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<StockStatus | "all">("all");
  const [modalProduct, setModalProduct] = useState<Product | null | "new">(null);

  const categories = useMemo(() => uniqueCategories(products), [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => (categoryFilter === "all" ? true : p.category === categoryFilter))
      .filter((p) => (statusFilter === "all" ? true : getStockStatus(p) === statusFilter))
      .filter((p) => (q ? p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) : true))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products, query, categoryFilter, statusFilter]);

  function handleDelete(product: Product) {
    if (window.confirm(`¿Eliminar "${product.name}" del inventario?`)) onDelete(product.id);
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full max-w-xs">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <InputField
              placeholder="Buscar por nombre o SKU..."
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <SelectField value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SelectField>
          <SelectField value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StockStatus | "all")}>
            <option value="all">Todos los estados</option>
            <option value="in">En stock</option>
            <option value="low">Stock bajo</option>
            <option value="out">Agotado</option>
          </SelectField>
        </div>
        <Button onClick={() => setModalProduct("new")}>
          <Plus size={16} /> Nuevo producto
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Package2}
          title={products.length === 0 ? "Sin productos todavía" : "Sin resultados"}
          description={
            products.length === 0
              ? "Agrega tu primer producto para empezar a controlar tu inventario."
              : "Ajusta la búsqueda o los filtros."
          }
          action={
            products.length === 0 ? (
              <Button onClick={() => setModalProduct("new")}>
                <Plus size={16} /> Nuevo producto
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="overflow-x-auto rounded-sm border border-[var(--paper-line)] bg-white">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="border-b border-[var(--paper-line)] text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Cantidad</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Precio</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--paper-line)]">
              {filtered.map((product) => {
                const status = getStockStatus(product);
                return (
                  <tr key={product.id} className="hover:bg-[var(--paper)]">
                    <td
                      className="border-l-[3px] px-3.5 py-3"
                      style={{ borderLeftColor: STRIPE_COLOR[status] }}
                    >
                      <p className="font-medium text-[var(--ink)]">{product.name}</p>
                      <p className="font-mono text-xs text-slate-500">
                        {product.sku} · {product.location || "Sin ubicación"}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{product.category}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onAdjustQuantity(product.id, -1)}
                          disabled={product.quantity === 0}
                          className="rounded-sm border border-[var(--paper-line)] p-1 text-slate-500 hover:bg-[var(--paper)] disabled:opacity-30"
                          aria-label="Restar unidad"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="tabular-nums w-8 text-center font-mono font-medium text-[var(--ink)]">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => onAdjustQuantity(product.id, 1)}
                          className="rounded-sm border border-[var(--paper-line)] p-1 text-slate-500 hover:bg-[var(--paper)]"
                          aria-label="Sumar unidad"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StockBadge status={status} label={STOCK_STATUS_LABELS[status]} />
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-medium text-[var(--ink)]">
                      {formatCurrency(product.unitPrice)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => setModalProduct(product)}
                          className="rounded-sm p-1.5 text-slate-500 hover:bg-[var(--paper)] hover:text-[var(--ink)]"
                          aria-label="Editar"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(product)}
                          className="rounded-sm p-1.5 text-slate-500 hover:bg-[var(--status-out-bg)] hover:text-[var(--status-out)]"
                          aria-label="Eliminar"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {modalProduct ? (
        <ProductModal
          product={modalProduct === "new" ? undefined : modalProduct}
          onClose={() => setModalProduct(null)}
          onSave={(product) => {
            if (modalProduct === "new") onCreate(product);
            else onUpdate(product);
            setModalProduct(null);
          }}
        />
      ) : null}
    </div>
  );
}
