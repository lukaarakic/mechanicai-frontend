import type { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Create your DashClue account to save diagnostics and vehicles.",
};

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;
