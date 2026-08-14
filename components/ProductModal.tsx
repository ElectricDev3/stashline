"use client";

import { FormEvent, useState } from "react";
import { Modal } from "./ui/Modal";
import { InputField } from "./ui/Field";
import { Button } from "./ui/Button";
import type { Product } from "@/lib/types";

interface ProductModalProps {
  product?: Product;
  onSave: (product: Product) => void;
  onClose: () => void;
}

export function ProductModal({ product, onSave, onClose }: ProductModalProps) {
  const [sku, setSku] = useState(product?.sku ?? "");
  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState(product?.category ?? "");
  const [quantity, setQuantity] = useState(product?.quantity ?? 0);
  const [reorderPoint, setReorderPoint] = useState(product?.reorderPoint ?? 5);
  const [unitCost, setUnitCost] = useState(product?.unitCost ?? 0);
  const [unitPrice, setUnitPrice] = useState(product?.unitPrice ?? 0);
  const [location, setLocation] = useState(product?.location ?? "");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !sku.trim()) return;

    const now = new Date().toISOString();
    onSave({
      id: product?.id ?? crypto.randomUUID(),
      sku: sku.trim(),
      name: name.trim(),
      category: category.trim() || "Sin categoría",
      quantity,
      reorderPoint,
      unitCost,
      unitPrice,
      location: location.trim(),
      createdAt: product?.createdAt ?? now,
      updatedAt: now,
    });
  }

  return (
    <Modal title={product ? "Editar producto" : "Nuevo producto"} onClose={onClose} width="md">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <InputField label="SKU" value={sku} onChange={(e) => setSku(e.target.value)} required autoFocus />
          <InputField label="Categoría" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <InputField label="Nombre del producto" value={name} onChange={(e) => setName(e.target.value)} required />
        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="Cantidad en stock"
            type="number"
            min={0}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <InputField
            label="Punto de reorden"
            type="number"
            min={0}
            value={reorderPoint}
            onChange={(e) => setReorderPoint(Number(e.target.value))}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="Costo unitario"
            type="number"
            min={0}
            step="0.01"
            value={unitCost}
            onChange={(e) => setUnitCost(Number(e.target.value))}
          />
          <InputField
            label="Precio de venta"
            type="number"
            min={0}
            step="0.01"
            value={unitPrice}
            onChange={(e) => setUnitPrice(Number(e.target.value))}
          />
        </div>
        <InputField label="Ubicación" value={location} onChange={(e) => setLocation(e.target.value)} />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Guardar producto</Button>
        </div>
      </form>
    </Modal>
  );
}
