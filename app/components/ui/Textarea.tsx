"use client";

import { cn } from "@/app/lib/cn";
import * as React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const MAX_HEIGHT = 160;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const innerRef = React.useRef<HTMLTextAreaElement>(null);

    // Grow with the content (also when the value is reset from outside).
    React.useLayoutEffect(() => {
      const el = innerRef.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
      el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
    }, [props.value]);

    return (
      <textarea
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        rows={1}
        className={cn(
          "min-h-16 flex w-full resize-none overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3",
          "text-base text-white placeholder:text-white/30 outline-none transition-colors sm:text-sm",
          "focus:border-white/25 focus:bg-white/[0.07]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
