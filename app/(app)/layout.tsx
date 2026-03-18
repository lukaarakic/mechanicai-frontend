import Navbar from "../components/Navbar";

const user = {
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

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full md:pb-0">
      <Navbar user={user} />

      <main className="h-full w-full md:ml-20 lg:p-0">{children}</main>
    </div>
  );
}

export default Layout;
