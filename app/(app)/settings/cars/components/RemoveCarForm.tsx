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
      try {
        await removeCarAction(car.id);
      } catch (err) {
        setError("Failed to remove car. Please try again.");
        setConfirmed(false);
      }
    });
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-base">
          🚗
        </div>
        <div>
          <p className="text-sm font-medium text-white">
            {car.make} {car.model}
          </p>
          <p className="text-xs text-white/35">
            {car.year} · {car.size}cc · {car.power}hp
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {confirmed ? (
          <>
            <Button
              variant="destructive"
              className="h-8 px-3 text-xs"
              onClick={handleRemove}
              disabled={isPending}
            >
              {isPending ? "Removing..." : "Confirm"}
            </Button>
            <Button
              variant="outline"
              className="h-8 px-3 text-xs"
              onClick={() => setConfirmed(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="destructive"
            className="h-8 px-3 text-xs"
            onClick={() => setConfirmed(true)}
          >
            Remove
          </Button>
        )}
      </div>
      <FormMessage error={error as string} />
    </div>
  );
};

export default RemoveCarForm;
