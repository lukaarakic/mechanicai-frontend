"use client";

import Button from "@/app/components/ui/Button";
import { cancelSubscriptionAction } from "@/app/lib/actions/settings/subscription/cancel-subscription";
import { useState, useTransition } from "react";

const CancelButton = () => {
  const [confirm, setConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleCancel = async () => {
    if (!confirm) {
      setConfirm(true);
      return;
    }

    startTransition(async () => {
      try {
        await cancelSubscriptionAction();
      } catch (err) {
        console.error("Error cancelling subscription:", err);
      }
    });

    setConfirm(false);
  };

  return (
    <Button onClick={handleCancel} disabled={isPending} variant="destructive">
      {isPending ? "Cancelling..." : confirm ? "Are you sure?" : "Cancel plan"}
    </Button>
  );
};

export default CancelButton;
