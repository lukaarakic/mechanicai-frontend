"use client";

import Link from "next/link";
import { useEffect } from "react";
import "@/app/globals.css";
import WhiteLogo from "@/app/assets/logo-white.svg";

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
    <html>
      <body>
        <div className="relative flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-12">
          <div
            className="pointer-events-none fixed inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="pointer-events-none fixed left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl" />

          <div className="relative w-full max-w-sm">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl shadow-black/60">
              <WhiteLogo className="mb-6 h-8 w-8" />

              <div className="flex flex-col items-center gap-4">
                <h1 className="text-2xl font-semibold text-white">
                  Something went wrong
                </h1>
                <p className="max-w-xs text-sm text-white/40">
                  An unexpected error occurred. You can try again or go back
                  home.
                </p>

                {error.message && (
                  <div className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-left">
                    <code className="text-sm text-red-400/80">
                      {error.message}
                    </code>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <a
                    href="/"
                    className="rounded-xl border border-white/10 bg-white/[0.05] px-5 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/[0.08] hover:text-white"
                  >
                    Go home
                  </a>
                  <button
                    onClick={reset}
                    className="cursor-pointer rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
