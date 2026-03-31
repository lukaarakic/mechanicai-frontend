/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | MechanicAI",
  description: "Request a password reset link for your MechanicAI account.",
};

const ForgotPassword = () => {
  return (
    <>
      <div className="mb-20 text-center">
        <h1 className="text-24 font-semibold mb-2">Forgot password</h1>
        <p className="text-sm">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPassword;
