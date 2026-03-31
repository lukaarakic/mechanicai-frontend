import { redirect } from "next/navigation";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPassword = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const verificationKey = params["key"];

  if (!verificationKey || typeof verificationKey !== "string") {
    redirect("/login?reset=invalid");
  }

  return (
    <>
      <ResetPasswordForm resetKey={verificationKey} />
    </>
  );
};

export default ResetPassword;
