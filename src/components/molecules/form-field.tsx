import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { FormFieldConfig } from "@/types";

interface FormFieldProps {
  field: FormFieldConfig;
  value: string;
  error?: string;
  idPrefix: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
}

export function FormField({
  field,
  value,
  error,
  idPrefix,
  onChange,
}: FormFieldProps) {
  const id = `${idPrefix}-${field.name}`;
  const errorId = error ? `${id}-error` : undefined;
  const invalid = !!error;

  const labelNode = (
    <label htmlFor={id} className="text-sm font-medium">
      {field.label}{" "}
      {field.required && <span aria-hidden="true">*</span>}
      {field.optional && (
        <span className="text-foreground/40">(optional)</span>
      )}
    </label>
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-1.5",
        field.colSpan === 2 && "sm:col-span-2",
      )}
    >
      {labelNode}
      {field.type === "textarea" && (
        <Textarea
          id={id}
          name={field.name}
          value={value}
          onChange={onChange}
          placeholder={field.placeholder}
          rows={field.rows ?? 4}
          required={field.required}
          aria-invalid={invalid}
          aria-describedby={errorId}
          className={invalid ? "border-destructive" : ""}
        />
      )}
      {field.type === "select" && (
        <select
          id={id}
          name={field.name}
          value={value}
          onChange={onChange}
          required={field.required}
          aria-invalid={invalid}
          aria-describedby={errorId}
          className={cn(
            "border-input focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full rounded-lg border bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:ring-3",
            invalid && "border-destructive",
          )}
        >
          {field.placeholder && (
            <option value="" disabled>
              {field.placeholder}
            </option>
          )}
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {field.type !== "textarea" && field.type !== "select" && (
        <Input
          id={id}
          name={field.name}
          type={field.type}
          value={value}
          onChange={onChange}
          placeholder={field.placeholder}
          required={field.required}
          min={field.type === "number" ? field.min : undefined}
          max={field.type === "number" ? field.max : undefined}
          aria-invalid={invalid}
          aria-describedby={errorId}
          className={invalid ? "border-destructive" : ""}
        />
      )}
      {error && (
        <p id={errorId} className="text-destructive text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
