"use client";

import Button from "@/app/components/ui/Button";
import FormMessage from "@/app/components/ui/FormMessage";
import { cancelSubscriptionAction } from "@/app/lib/actions/settings/subscription/cancel-subscription";
import { useState, useTransition } from "react";

const CancelButton = () => {
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleCancel = () => {
    setError(null);
    startTransition(async () => {
      const result = await cancelSubscriptionAction();
      if (result.error) setError(result.error);
      setConfirm(false);
    });
  };

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      {confirm ? (
        <div className="flex gap-2">
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={isPending}
          >
            {isPending ? "Cancelling..." : "Yes, cancel"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setConfirm(false)}
            disabled={isPending}
          >
            Keep Pro
          </Button>
        </div>
      ) : (
        <Button variant="destructive" onClick={() => setConfirm(true)}>
          Cancel plan
        </Button>
      )}
      <FormMessage error={error} />
    </div>
  );
};

export default CancelButton;
