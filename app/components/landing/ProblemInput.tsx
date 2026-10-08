"use client";

import { useRouter } from "next/navigation";
import { useId, useRef, useState, useTransition } from "react";
import { ArrowRight, Check } from "lucide-react";
import { savePendingProblem } from "@/app/lib/pending-problem";
import {
  MESSAGE_MAX_LENGTH,
  MessageContentSchema,
} from "@/app/lib/validations/chat-validation";
import FormMessage from "../ui/FormMessage";
import { cn } from "@/app/lib/cn";

const EXAMPLES = [
  "Squealing when I brake",
  "Battery light is on",
  "Car pulls to the left",
];

// Typing the problem before signing up is the page's main conversion step:
// the text is saved and opens as the user's first diagnosis after signup.
const ProblemInput = ({
  className,
  inputId,
  defaultText = "",
}: {
  className?: string;
  inputId?: string;
  // Pre-fills the box, e.g. with the code a reference page is about.
  defaultText?: string;
}) => {
  const router = useRouter();
  const generatedId = useId();
  const id = inputId ?? generatedId;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState(defaultText);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const submit = () => {
    const parsed = MessageContentSchema.safeParse(text);
    if (!parsed.success) {
      setError("Describe what's happening with your car first.");
      textareaRef.current?.focus();
      return;
    }
    setError(null);
    savePendingProblem(parsed.data);
    startTransition(() => router.push("/register"));
  };

  return (
    <div className={className}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="relative"
      >
        <label htmlFor={id} className="sr-only">
          What&apos;s wrong with your car?
        </label>
        <textarea
          id={id}
          ref={textareaRef}
          value={text}
          rows={2}
          maxLength={MESSAGE_MAX_LENGTH}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey &&
              !e.nativeEvent.isComposing
            ) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="What's wrong with your car?"
          aria-describedby={error ? `${id}-error` : undefined}
          className="block w-full resize-none rounded-2xl border border-white/15 bg-white/[0.04] py-4 pr-16 pl-4 text-base text-white shadow-2xl shadow-black/40 outline-none transition-colors placeholder:text-white/40 focus:border-white/30 focus:bg-white/[0.07]"
        />
        <button
          type="submit"
          disabled={isPending}
          aria-label="Diagnose my car"
          className="absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl bg-white text-black transition-transform hover:bg-white/90 active:scale-95 disabled:opacity-50"
        >
          <ArrowRight className="h-5 w-5" aria-hidden />
        </button>
      </form>

      <FormMessage id={`${id}-error`} error={error} />

      <div className="mt-3 flex flex-wrap gap-2">
        {EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => {
              setText(example);
              setError(null);
              textareaRef.current?.focus();
            }}
            className={cn(
              "min-h-9 cursor-pointer rounded-full border border-white/10 bg-white/[0.04] px-3 text-sm text-white/70 transition-colors",
              "hover:border-white/25 hover:text-white",
            )}
          >
            {example}
          </button>
        ))}
      </div>

      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/60">
        {["Free", "No card needed", "Answer in about 2 minutes"].map((item) => (
          <span key={item} className="inline-flex items-center gap-1.5">
            <Check className="h-4 w-4 text-emerald-400" aria-hidden />
            {item}
          </span>
        ))}
      </p>
    </div>
  );
};

export default ProblemInput;
