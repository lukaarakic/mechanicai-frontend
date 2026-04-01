import { ChangeEvent, FC, InputHTMLAttributes } from "react";
import { cn } from "@/app/lib/cn";

interface FieldProps {
  label?: string;
  type: string;
  name: string;
  value?: string | number;
  placeholder?: string;
  className?: string;
  boxClassName?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Field: FC<FieldProps & InputHTMLAttributes<HTMLInputElement>> = ({
  label,
  type,
  name,
  value,
  placeholder,
  className = "",
  boxClassName = "",
  onChange,
  ...props
}) => {
  return (
    <div className={`flex w-full flex-col gap-1.5 ${boxClassName}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-xs font-medium capitalize tracking-wide text-white/40"
        >
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5",
          "text-sm text-white placeholder:text-white/20",
          "outline-none transition-all",
          "focus:border-white/25 focus:bg-white/[0.07] focus:ring-1 focus:ring-white/10",
          "disabled:cursor-not-allowed disabled:opacity-40",
          className,
        )}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default Field;
