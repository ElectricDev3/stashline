export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatDate(value: string): string {
  if (!value) return "";
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}
