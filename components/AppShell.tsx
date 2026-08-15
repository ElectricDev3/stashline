"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar, type View } from "./Sidebar";
import { DashboardView } from "./DashboardView";
import { ProductsView } from "./ProductsView";
import { getProducts, saveProducts, seedDemoDataIfEmpty } from "@/lib/storage";
import type { Product } from "@/lib/types";

function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h1>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}

export function AppShell() {
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<View>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    seedDemoDataIfEmpty();
    setProducts(getProducts());
    setLoaded(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (loaded) saveProducts(products);
  }, [products, loaded]);

  function adjustQuantity(id: string, delta: number) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantity: Math.max(0, p.quantity + delta), updatedAt: new Date().toISOString() }
          : p
      )
    );
  }

  if (!loaded) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-slate-400">Cargando…</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar active={view} onNavigate={setView} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="min-w-0 flex-1 overflow-y-auto px-4 py-4 sm:px-8 sm:py-8">
        <button
          onClick={() => setSidebarOpen(true)}
          className="mb-4 flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 md:hidden"
        >
          <Menu size={16} />
          Menú
        </button>
        <div className="mx-auto max-w-6xl">
          {view === "dashboard" ? (
            <>
              <PageHeader title="Dashboard" subtitle="Resumen de tu inventario" />
              <DashboardView products={products} />
            </>
          ) : (
            <>
              <PageHeader title="Productos" subtitle="Administra tu catálogo e inventario" />
              <ProductsView
                products={products}
                onCreate={(product) => setProducts((prev) => [...prev, product])}
                onUpdate={(product) =>
                  setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)))
                }
                onDelete={(id) => setProducts((prev) => prev.filter((p) => p.id !== id))}
                onAdjustQuantity={adjustQuantity}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
