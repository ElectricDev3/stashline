import type { Product } from "./types";

const KEYS = {
  products: "improject:products",
  seeded: "improject:seeded",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getProducts(): Product[] {
  return read<Product[]>(KEYS.products, []);
}

export function saveProducts(products: Product[]): void {
  write(KEYS.products, products);
}

function demoProduct(partial: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
  const now = new Date().toISOString();
  return { id: crypto.randomUUID(), createdAt: now, updatedAt: now, ...partial };
}

export function seedDemoDataIfEmpty(): void {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(KEYS.seeded)) return;

  if (getProducts().length === 0) {
    const products: Product[] = [
      demoProduct({
        sku: "TEC-001",
        name: "Mouse inalámbrico",
        category: "Tecnología",
        quantity: 42,
        reorderPoint: 15,
        unitCost: 8.5,
        unitPrice: 19.99,
        location: "Almacén A - Estante 3",
      }),
      demoProduct({
        sku: "TEC-002",
        name: "Teclado mecánico",
        category: "Tecnología",
        quantity: 8,
        reorderPoint: 10,
        unitCost: 22,
        unitPrice: 49.99,
        location: "Almacén A - Estante 3",
      }),
      demoProduct({
        sku: "OFI-010",
        name: "Silla ergonómica",
        category: "Oficina",
        quantity: 0,
        reorderPoint: 5,
        unitCost: 95,
        unitPrice: 189.99,
        location: "Almacén B - Piso 1",
      }),
      demoProduct({
        sku: "OFI-014",
        name: "Escritorio ajustable",
        category: "Oficina",
        quantity: 12,
        reorderPoint: 4,
        unitCost: 140,
        unitPrice: 279.99,
        location: "Almacén B - Piso 1",
      }),
      demoProduct({
        sku: "PAP-003",
        name: "Paquete de papel A4 (500 hojas)",
        category: "Papelería",
        quantity: 130,
        reorderPoint: 30,
        unitCost: 3.2,
        unitPrice: 6.5,
        location: "Almacén A - Estante 1",
      }),
    ];
    saveProducts(products);
  }

  window.localStorage.setItem(KEYS.seeded, "1");
}
