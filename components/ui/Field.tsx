import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, useId } from "react";

const baseClasses =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-slate-600">
      {children}
    </label>
  );
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function InputField({ label, id, className = "", ...props }: InputFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div>
      {label ? <Label htmlFor={inputId}>{label}</Label> : null}
      <input id={inputId} className={`${baseClasses} ${className}`} {...props} />
    </div>
  );
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextareaField({ label, id, className = "", ...props }: TextareaFieldProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  return (
    <div>
      {label ? <Label htmlFor={textareaId}>{label}</Label> : null}
      <textarea id={textareaId} className={`${baseClasses} ${className}`} {...props} />
    </div>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function SelectField({ label, id, className = "", children, ...props }: SelectFieldProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  return (
    <div>
      {label ? <Label htmlFor={selectId}>{label}</Label> : null}
      <select id={selectId} className={`${baseClasses} ${className}`} {...props}>
        {children}
      </select>
    </div>
  );
}
