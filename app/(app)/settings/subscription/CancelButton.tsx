"use client";

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
    <button
      onClick={handleCancel}
      disabled={isPending}
      className={`shrink-0 rounded-xl border px-4 py-2 text-xs font-medium transition-all active:scale-[0.98] disabled:opacity-50 ${
        confirm
          ? "border-red-500/50 bg-red-500/20 text-red-300"
          : "border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
      }`}
    >
      {isPending ? "Cancelling..." : confirm ? "Are you sure?" : "Cancel plan"}
    </button>
  );
};

export default CancelButton;
