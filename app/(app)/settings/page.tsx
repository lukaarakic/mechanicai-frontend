import { redirect } from "next/navigation";

const page = () => {
  redirect("/settings/account");

  return <></>;
};

export default page;
