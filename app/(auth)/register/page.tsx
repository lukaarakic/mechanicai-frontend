import type { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Register | MechanicAI",
  description:
    "Create your MechanicAI account to save diagnostics and vehicles.",
};

const RegisterPage = () => {
  return <RegisterClient />;
};

export default RegisterPage;
