"use client";

import { useState } from "react";

const SubscribeButton = () => {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    setIsPending(true);

    // Make API call to create subscription

    setIsPending(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="w-full rounded-lg bg-white py-2 text-xs font-semibold text-black transition-all hover:bg-white/90 active:scale-[0.98] disabled:opacity-50"
    >
      {isPending ? "Loading..." : "Upgrade to Pro →"}
    </button>
  );
};

export default SubscribeButton;
