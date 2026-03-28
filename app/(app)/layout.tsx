import { cookies } from "next/headers";
import Navbar from "../components/Navbar";
import Button from "../components/ui/button";
import Field from "../components/ui/field";
import Image from "next/image";
import OnboardingForm from "../components/onboarding-module/OnboardingFrom";

const userDemo = {
  id: "demo-user-001",
  email: "demo@mechanicai.dev",
  firstName: "Demo",
  lastName: "User",
  avatar: "https://i.pravatar.cc/160?img=12",
  car: [{ id: "demo-car-001" }],
  subscription: {
    status: "ACTIVE",
  },
};

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("auth_token")?.value;

  const user = await fetch(`${process.env.API_URL}/current-user`, {
    method: "GET",
    headers: {
      Authorization: `${jwtToken}`,
    },
  });

  return (
    <div className="flex h-svh bg-black">
      <Navbar user={userDemo} />

      <main className="flex h-full w-full flex-col overflow-y-auto pb-20 md:ml-16 md:pb-0">
        {children}
      </main>

      <OnboardingForm />
    </div>
  );
}

export default Layout;
