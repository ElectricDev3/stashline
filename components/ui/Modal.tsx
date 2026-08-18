"use client";

import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  width?: "sm" | "md" | "lg";
}

const WIDTH_CLASSES = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
};

export function Modal({ title, onClose, children, width = "md" }: ModalProps) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-10">
      <div className={`w-full ${WIDTH_CLASSES[width]} rounded-sm border-t-4 border-[var(--accent)] bg-white shadow-xl`}>
        <div className="flex items-center justify-between border-b border-[var(--paper-line)] px-5 py-4">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-[var(--ink)]">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-sm p-1 text-slate-400 hover:bg-[var(--paper)] hover:text-[var(--ink)]"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
