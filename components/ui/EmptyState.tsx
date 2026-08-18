import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-[var(--paper-line)] bg-white/60 px-6 py-16 text-center">
      <Icon size={28} className="mb-3 text-slate-300" strokeWidth={1.5} />
      <p className="font-display text-base font-bold uppercase tracking-wide text-[var(--ink)]">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
