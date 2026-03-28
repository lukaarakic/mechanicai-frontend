import OtherLinks from "./OtherLinks";
import WhiteLogo from "@/app/assets/logo-white.svg";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
          {children}
        </div>
      </div>

      <OtherLinks />
    </div>
  );
}

export default Layout;
