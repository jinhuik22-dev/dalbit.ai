import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  LabelHTMLAttributes,
  forwardRef,
} from "react";

/* ─── Shared styles ─── */

const fieldBase = [
  "w-full px-4 py-2.5 rounded-lg",
  "bg-surface border border-border text-foreground",
  "placeholder:text-muted-foreground",
  "focus:border-accent focus:ring-1 focus:ring-accent",
  "outline-none transition-colors duration-200",
].join(" ");

const errorField = "border-red-400 focus:border-red-500 focus:ring-red-500";

/* ─── Label ─── */

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({
  children,
  className = "",
  required,
  ...props
}: LabelProps) {
  return (
    <label
      className={`block text-sm font-medium text-foreground ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-accent ml-0.5">*</span>}
    </label>
  );
}

/* ─── Input ─── */

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        <Label htmlFor={inputId} required={props.required}>
          {label}
        </Label>
        <input
          ref={ref}
          id={inputId}
          className={`${fieldBase} ${error ? errorField : ""} ${className}`}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-red-500 text-xs" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

/* ─── Textarea ─── */

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        <Label htmlFor={inputId} required={props.required}>
          {label}
        </Label>
        <textarea
          ref={ref}
          id={inputId}
          className={`${fieldBase} resize-y min-h-[120px] ${error ? errorField : ""} ${className}`}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-red-500 text-xs" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

/* ─── Select ─── */

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      placeholder = "Select...",
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        <Label htmlFor={inputId} required={props.required}>
          {label}
        </Label>
        <select
          ref={ref}
          id={inputId}
          className={`${fieldBase} ${error ? errorField : ""} ${className}`}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${inputId}-error`} className="text-red-500 text-xs" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
