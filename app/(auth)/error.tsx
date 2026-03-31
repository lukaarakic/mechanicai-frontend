"use client";

import { useEffect } from "react";
import Button from "../components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <div className="flex flex-col items-center gap-6 rounded-2xl  px-10 py-8 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-semibold text-white">
            Something went wrong
          </h1>
          <p className="max-w-xs text-sm text-white/40">
            An unexpected error occurred. You can try again or go back home.
          </p>
        </div>

        <code className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-left text-xs text-red-400">
          {error?.message}
        </code>

        <div className="flex items-center gap-3">
          <Button onClick={reset}>Try again</Button>
        </div>

        <p className="text-xs text-white/20">MechanicAI · Unexpected error</p>
      </div>
    </div>
  );
}
