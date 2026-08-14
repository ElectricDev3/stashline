export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  reorderPoint: number;
  unitCost: number;
  unitPrice: number;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export type StockStatus = "out" | "low" | "in";

export const STOCK_STATUS_LABELS: Record<StockStatus, string> = {
  out: "Agotado",
  low: "Stock bajo",
  in: "En stock",
};
