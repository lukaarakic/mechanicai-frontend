"use client";

import Button from "@/app/components/ui/Button";
import { useState } from "react";

const CancelButton = () => {
  const [isPending, setIsPending] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleCancel = async () => {
    if (!confirm) {
      setConfirm(true);
      return;
    }

    setIsPending(true);

    // Make API call to cancel subscription

    setIsPending(false);
    setConfirm(false);
  };

  return (
    <Button
      onClick={handleCancel}
      disabled={isPending}
      className={`${
        confirm
          ? "border-red-500/50 bg-red-500/20 text-red-300"
          : "border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
      }`}
    >
      {isPending ? "Cancelling..." : confirm ? "Are you sure?" : "Cancel plan"}
    </Button>
  );
};

export default CancelButton;
