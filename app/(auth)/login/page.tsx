import type { Metadata } from "next";
import LoginForm from "./LoginForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Log In | MechanicAI",
  description: "Access your MechanicAI account and continue diagnosing.",
};

const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <div className="h-[42px] rounded-lg bg-white/5 animate-pulse mb-4" />
      }
    >
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
