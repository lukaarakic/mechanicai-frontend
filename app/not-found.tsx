/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Button from "./components/ui/Button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-[120px]" />
        <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-white/[0.03] blur-[80px]" />
        <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-white/[0.03] blur-[80px]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">
        <div className="relative">
          <span className="select-none text-[10rem] font-bold leading-none tracking-tighter text-white/[0.04]">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-3xl shadow-lg backdrop-blur-sm">
              🔧
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-10 py-8 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-semibold text-white">
              Page not found
            </h1>
            <p className="max-w-xs text-sm text-white/40">
              Looks like this road leads nowhere. The page you're looking for
              doesn't exist or has been moved.
            </p>
          </div>

          <Button>
            <Link href="/">Go home</Link>
          </Button>
        </div>

        <p className="text-xs text-white/20">MechanicAI · Error 404</p>
      </div>
    </main>
  );
}
