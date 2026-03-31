import type { Metadata } from "next";
import Button from "@/app/components/ui/Button";
import ErrorList from "@/app/components/ui/ErrorList";
import Field from "@/app/components/ui/Field";
import { EmailSchema } from "@/app/lib/validations/user-validation";
import { z } from "zod";

export const metadata: Metadata = {
  title: "Forgot Password | MechanicAI",
  description: "Request a password reset link for your MechanicAI account.",
};

const ForgotPasswordSchema = z.object({
  email: EmailSchema,
});

const ForgotPassword = () => {
  return (
    <>
      <div className="mb-40 text-center">
        <h1 className="text-24 font-semibold mb-4">Forgot password</h1>
        <p className="text-16">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      <form aria-label="Forgot password form" className="inline-block w-full">
        <div className="mb-20">
          <Field
            placeholder="name@example.com"
            type="email"
            name="email"
            label="Email"
          />
          <ErrorList />
        </div>

        <ErrorList />

        <Button className="w-full" type="submit">
          Recover password
        </Button>
      </form>
    </>
  );
};

export default ForgotPassword;
