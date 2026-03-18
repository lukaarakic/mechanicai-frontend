"use client";

import { cn } from "@/app/lib/cn";
import * as React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onChange, ...props }, ref) => {
    const innerRef = React.useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const el = innerRef.current;
      if (el) {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }
      onChange?.(e);
    };

    return (
      <textarea
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        rows={1}
        onChange={handleChange}
        className={cn(
          `min-h-16 flex w-full rounded-md border border-input resize-none overflow-hidden
          bg-auto px-3 py-2 text-sm ring-offset-background 
          placeholder:text-muted-foreground focus-visible:outline-0 focus-visible:ring-0 
          focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`,
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
