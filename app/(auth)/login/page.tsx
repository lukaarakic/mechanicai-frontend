import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Log In | MechanicAI",
  description: "Access your MechanicAI account and continue diagnosing.",
};

const LoginPage = () => {
  return <LoginClient />;
};

export default LoginPage;
