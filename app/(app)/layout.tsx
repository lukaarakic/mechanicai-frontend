import { cookies } from "next/headers";
import Navbar from "../components/Navbar";
import Button from "../components/ui/button";
import Field from "../components/ui/field";
import Image from "next/image";

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

  console.log("Current user:", await user.json());

  return (
    <div className="flex md:pb-0 h-svh relative">
      <Navbar user={userDemo} />

      <main className="h-full w-full ml-20 md:ml-0 lg:p-0">{children}</main>

      <div className="fixed z-50 h-dvh w-full bg-black/70">
        <div className="mx-auto flex h-full w-full items-center justify-center text-white">
          <div className="h-[70dvh] w-[90vw] overflow-y-scroll rounded-7 border border-white/15 bg-black p-40 md:h-auto md:w-auto md:overflow-hidden">
            <h2 className="text-xl font-semibold text-white">
              Just one more step
            </h2>
            <p className="mb-40 mt-1 text-sm text-white/60">
              Add some more details.
            </p>

            <form className="grid max-w-5xl grid-cols-1 items-center justify-center gap-20 md:grid-cols-2">
              <div className="col-span-2 flex gap-4 mb-10">
                <Field
                  label="First Name"
                  placeholder="First Name"
                  type="text"
                />
                <Field label="Last Name" placeholder="Last Name" type="text" />
              </div>

              <div className="col-span-2 flex items-center flex-col gap-20">
                <Image
                  src="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=demo-user-002"
                  alt="User Avatar"
                  width={160}
                  height={160}
                  className="rounded-full mx-auto"
                  unoptimized
                />

                <Button>Reroll 🎲</Button>
              </div>

              <Button className="mb-0.5 col-start-2">Next ➡️</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
