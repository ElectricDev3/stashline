# Stashline (IMProject)

Micro-SaaS de control de inventario. Gestiona productos, cantidades, precios y alertas de reabastecimiento con búsqueda, filtros y un dashboard con el valor total del inventario.

> Nombre comercial: **Stashline** · Identificador técnico: `IMProject` · Identificador de portafolio: `IM2Prf`

## Propuesta

Un pequeño negocio necesita saber qué tiene, cuánto vale y qué se está por acabar sin depender de una hoja de cálculo desordenada. Stashline resuelve eso: alta de productos con SKU, categoría, costo y precio, ajuste rápido de cantidades, estados automáticos de stock, y un dashboard con el valor total del inventario y las alertas de reabastecimiento.

## Funciones

- CRUD de productos (SKU, nombre, categoría, cantidad, punto de reorden, costo, precio, ubicación).
- Ajuste rápido de cantidad (+/-) directamente desde la tabla.
- Estados de inventario automáticos: **En stock**, **Stock bajo**, **Agotado** (según cantidad vs. punto de reorden).
- Búsqueda por nombre/SKU y filtros por categoría y estado.
- Dashboard con SKUs activos, unidades totales, valor de inventario (costo × cantidad) y alertas de reabastecimiento.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- `lucide-react` para iconografía
- Persistencia en `localStorage` (sin backend/DB): mismo criterio que en el resto del portafolio — no se añade Supabase donde un MVP de un solo usuario no lo necesita.

## Estructura relevante

```
app/                  Rutas de Next.js (app de una sola página)
components/           Vistas y componentes de UI
  ui/                 Primitivas (Button, Field, Modal, Badge, EmptyState)
lib/
  types.ts            Tipos de dominio (Product, StockStatus)
  inventory.ts         Lógica de negocio: estado de stock, valor de inventario
  storage.ts            Lectura/escritura en localStorage + datos de ejemplo
  format.ts             Formato de moneda y fechas
```

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000). Se cargan 5 productos de ejemplo (incluyendo uno agotado y uno en stock bajo) para ver el dashboard funcionando de inmediato.

```bash
npm run build   # build de producción
npm run lint    # eslint
```

## Variables de entorno

Ninguna. No hay APIs externas ni claves; toda la persistencia es local (`localStorage`), por lo que no aplica `.env.example`.

## Despliegue

Preparado para Vercel: `npm run build` sin pasos adicionales, sin variables de entorno requeridas.

## Estado

MVP funcional y probado localmente (build, lint y flujo end-to-end con Playwright: dashboard, búsqueda, ajuste de cantidad, alta de producto, alertas de stock).

## Pendientes / posibles siguientes pasos

- Historial de movimientos de stock (entradas/salidas con fecha).
- Exportar catálogo a CSV.
- Multi-almacén con transferencias entre ubicaciones.
