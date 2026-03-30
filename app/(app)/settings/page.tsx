import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Settings | MechanicAI",
  description: "Manage your account, cars, and subscription settings.",
};

const page = () => {
  redirect("/settings/account");

  return <></>;
};

export default page;
