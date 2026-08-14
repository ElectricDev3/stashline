import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const baseClasses =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200";

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-xs font-medium text-slate-600">{children}</label>;
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function InputField({ label, className = "", ...props }: InputFieldProps) {
  return (
    <div>
      {label ? <Label>{label}</Label> : null}
      <input className={`${baseClasses} ${className}`} {...props} />
    </div>
  );
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextareaField({ label, className = "", ...props }: TextareaFieldProps) {
  return (
    <div>
      {label ? <Label>{label}</Label> : null}
      <textarea className={`${baseClasses} ${className}`} {...props} />
    </div>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function SelectField({ label, className = "", children, ...props }: SelectFieldProps) {
  return (
    <div>
      {label ? <Label>{label}</Label> : null}
      <select className={`${baseClasses} ${className}`} {...props}>
        {children}
      </select>
    </div>
  );
}
