"use client";

import { useState, useSyncExternalStore, useTransition } from "react";
import Button, { ButtonLink } from "@/app/components/ui/Button";
import FormMessage from "@/app/components/ui/FormMessage";
import createChatAction from "@/app/lib/actions/chat/create-chat";
import { MESSAGE_MAX_LENGTH } from "@/app/lib/validations/chat-validation";
import { Car } from "@/app/types/car";
import { cn } from "@/app/lib/cn";
import {
  clearPendingProblem,
  savePendingProblem,
  usePendingProblem,
} from "@/app/lib/pending-problem";

const noopSubscribe = () => () => {};

const NewChatForm = ({
  cars,
  freeChatsRemaining,
}: {
  cars: Car[];
  freeChatsRemaining: number | null;
}) => {
  // False during SSR and until hydration. Clicking submit before then would do
  // a native form submit that reloads the page and wipes the description.
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const [pickedCarId, setSelectedCarId] = useState<string | null>(null);
  // Falls back to the first car, including cars added after this form
  // mounted (e.g. during onboarding on this page).
  const selectedCarId =
    cars.find((car) => car.id === pickedCarId)?.id ?? cars[0]?.id ?? "";
  // Starts with the problem typed on the landing page, if any.
  const pendingProblem = usePendingProblem();
  const [typed, setTyped] = useState<string | null>(null);
  const message = typed ?? pendingProblem ?? "";
  const setMessage = setTyped;
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCarId || !message.trim()) {
      setError("Please select a car and describe the problem.");
      return;
    }
    setError("");

    startTransition(async () => {
      clearPendingProblem();
      const result = await createChatAction(selectedCarId, message);
      // On success the action redirects to the new chat.
      if (result?.error) {
        setError(result.error);
        setTyped(message);
        if (pendingProblem) savePendingProblem(pendingProblem);
      }
    });
  };

  return (
    <div className="w-full max-w-lg">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-xs text-white/50 tracking-wide">
            New diagnostic
          </span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          What&apos;s the problem?
        </h1>
        <p className="mt-1.5 text-sm text-white/40">
          {freeChatsRemaining === 0
            ? "Your free diagnostics will reset next month."
            : "Select your vehicle and describe the issue."}
          {freeChatsRemaining !== null &&
            freeChatsRemaining > 0 &&
            ` ${freeChatsRemaining} free ${freeChatsRemaining === 1 ? "diagnostic" : "diagnostics"} left this month.`}
        </p>
      </div>

      {freeChatsRemaining === 0 ? (
        <div className="flex flex-col items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm text-white/50">
            You&apos;ve used your free diagnostics for this month. Upgrade to
            Pro for unlimited diagnostics, or come back next month.
          </p>
          <ButtonLink href="/settings/subscription">Upgrade to Pro</ButtonLink>
        </div>
      ) : cars.length === 0 ? (
        <div className="flex flex-col items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm text-white/50">
            Add a vehicle first so DashClue knows what it&apos;s diagnosing.
          </p>
          <ButtonLink href="/settings/cars">Add a car</ButtonLink>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div
            role="radiogroup"
            aria-label="Vehicle"
            className="flex flex-wrap gap-2"
          >
            {cars.map((car) => (
              <button
                key={car.id}
                type="button"
                role="radio"
                aria-checked={selectedCarId === car.id}
                onClick={() => setSelectedCarId(car.id)}
                className={cn(
                  "rounded-xl border px-4 py-2 text-sm transition-all cursor-pointer",
                  selectedCarId === car.id
                    ? "border-white/30 bg-white/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/40 hover:border-white/20 hover:text-white/70",
                )}
              >
                {car.make} {car.model} · {car.year}
              </button>
            ))}
          </div>

          <label htmlFor="problem" className="sr-only">
            Describe the problem
          </label>
          <textarea
            id="problem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. Grinding noise from the front left when braking, started last week"
            rows={4}
            maxLength={MESSAGE_MAX_LENGTH}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base text-white sm:text-sm placeholder:text-white/30 focus:border-white/20 focus:outline-none transition-colors resize-none"
          />

          <FormMessage error={error} />

          <Button type="submit" disabled={!hydrated || isPending}>
            {isPending ? "Starting..." : "Start diagnostic →"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default NewChatForm;
