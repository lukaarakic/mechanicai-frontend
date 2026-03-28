import { cookies } from "next/headers";
import Navbar from "../components/Navbar";
import OnboardingForm from "../components/onboarding-module/OnboardingForm";
import { getUser } from "../lib/getUser";

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <div className="flex h-svh bg-black">
      <Navbar user={user} />

      <main className="flex h-full w-full flex-col overflow-y-auto pb-20 md:ml-16 md:pb-0">
        {children}
      </main>

      {user?.onboarding_done === false && <OnboardingForm />}
    </div>
  );
}

export default Layout;
