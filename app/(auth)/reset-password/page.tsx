import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Choose a new password for your DashClue account.",
};

const ResetPassword = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const verificationKey = params["key"];

  if (
    typeof verificationKey !== "string" ||
    !/^[A-Za-z0-9_-]{20,200}$/.test(verificationKey)
  ) {
    redirect("/login?reset=invalid");
  }

  return (
    <>
      <ResetPasswordForm resetKey={verificationKey} />
    </>
  );
};

export default ResetPassword;
