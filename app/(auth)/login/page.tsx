import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Log In | MechanicAI",
  description: "Access your MechanicAI account and continue diagnosing.",
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
