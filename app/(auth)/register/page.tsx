import type { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Register | MechanicAI",
  description:
    "Create your MechanicAI account to save diagnostics and vehicles.",
};

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;
