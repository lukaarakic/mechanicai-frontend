import type { Metadata } from "next";
import ForgotPasswordForm from "./ForgotPasswordForm";
import AuthHeader from "@/app/components/AuthHeader";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Request a password reset link for your DashClue account.",
};

const ForgotPassword = () => {
  return (
    <>
      <AuthHeader
        title="Forgot password"
        subtitle="No worries, we'll email you a reset link."
      />

      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPassword;
