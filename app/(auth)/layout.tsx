import OtherLinks from "./OtherLinks";
import WhiteLogo from "@/app/assets/logo-white.svg";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-20">
      <div className="flex w-full flex-col items-center rounded-12 p-20 lg:w-[35.125rem] lg:border lg:border-white/15 lg:p-40">
        <WhiteLogo className="w-40 h-40 mb-5" />

        {children}
      </div>

      <OtherLinks />
    </div>
  );
}

export default Layout;
