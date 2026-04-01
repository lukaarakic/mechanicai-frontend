import type { FC, ReactNode } from "react";
import { cn } from "@/app/lib/cn";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "destructive" | "outline";
}

const Button: FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  onClick,
  children,
  className,
  disabled = false,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2",
        "rounded-lg px-4 py-2.5 text-sm font-semibold",
        "transition-all duration-150 active:scale-[0.98]",
        "disabled:pointer-events-none disabled:opacity-40",

        variant === "primary" && "bg-white text-black hover:bg-white/90",
        variant === "destructive" &&
          "border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300",
        variant === "outline" &&
          "border border-white/10 bg-white/[0.04] text-white/70 hover:border-white/20 hover:bg-white/[0.08] hover:text-white",

        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
