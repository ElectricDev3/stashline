import type { Product, StockStatus } from "./types";

export function getStockStatus(product: Product): StockStatus {
  if (product.quantity <= 0) return "out";
  if (product.quantity <= product.reorderPoint) return "low";
  return "in";
}

export function inventoryValue(products: Product[]): number {
  return products.reduce((sum, p) => sum + p.quantity * p.unitCost, 0);
}

export function uniqueCategories(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.category).filter(Boolean))).sort();
}
