"use client";

import Button from "@/app/components/ui/Button";
import FormMessage from "@/app/components/ui/FormMessage";
import { removeCarAction } from "@/app/lib/actions/settings/cars/remove-car";
import { Car } from "@/app/types/car";
import { useState, useTransition } from "react";

const RemoveCarForm = ({ car }: { car: Car }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    setError(null);
    startTransition(async () => {
      const result = await removeCarAction(car.id);
      if (result.error) {
        setError(result.error);
        setConfirmed(false);
      }
    });
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-base"
          >
            🚗
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {car.make} {car.model}
            </p>
            <p className="text-xs text-white/40">
              {car.year} · {car.size}cc · {car.power}hp
            </p>
          </div>
        </div>

        {!confirmed && (
          <Button
            variant="destructive"
            className="h-8 px-3 text-xs"
            onClick={() => setConfirmed(true)}
          >
            Remove
          </Button>
        )}
      </div>

      {confirmed && (
        <div className="flex flex-col gap-3 border-t border-white/[0.06] pt-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            This also deletes every diagnostic for this car.
          </p>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              className="h-8 px-3 text-xs"
              onClick={handleRemove}
              disabled={isPending}
            >
              {isPending ? "Removing..." : "Remove car"}
            </Button>
            <Button
              variant="outline"
              className="h-8 px-3 text-xs"
              onClick={() => setConfirmed(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <FormMessage error={error} className="mt-0" />
    </div>
  );
};

export default RemoveCarForm;
