import Button from "@/app/components/ui/button";
import ErrorList from "@/app/components/ui/ErrorList";
import Field from "@/app/components/ui/field";
import { EmailSchema } from "@/app/lib/user-validation";
import { z } from "zod";

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
