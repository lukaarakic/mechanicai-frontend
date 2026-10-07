import type { ComponentProps, FC, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/app/lib/cn";

type Variant = "primary" | "destructive" | "outline";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: Variant;
}

export const buttonClassName = (
  variant: Variant = "primary",
  className?: string,
) =>
  cn(
    "inline-flex cursor-pointer items-center justify-center gap-2",
    "rounded-lg px-4 py-2.5 text-sm font-semibold",
    "transition-all duration-150 active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
    "disabled:pointer-events-none disabled:opacity-40",

    variant === "primary" && "bg-white text-black hover:bg-white/90",
    variant === "destructive" &&
      "border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300",
    variant === "outline" &&
      "border border-white/10 bg-white/[0.04] text-white/70 hover:border-white/20 hover:bg-white/[0.08] hover:text-white",

    className,
  );

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
      className={buttonClassName(variant, className)}
      {...props}
    >
      {children}
    </button>
  );
};

// A link styled as a button. Use instead of nesting <Link> inside <Button>,
// which is invalid HTML and leaves the button padding unclickable.
export const ButtonLink: FC<
  ComponentProps<typeof Link> & { variant?: Variant }
> = ({ variant = "primary", className, ...props }) => (
  <Link className={buttonClassName(variant, className)} {...props} />
);

export default Button;
