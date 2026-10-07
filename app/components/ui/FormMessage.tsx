import { cn } from "@/app/lib/cn";

type FormMessageProps = {
  error?: string | null;
  success?: string | null;
  className?: string;
  id?: string;
};

const FormMessage = ({ error, success, className, id }: FormMessageProps) => {
  const message = error || success;
  if (!message) return null;

  return (
    <p
      id={id}
      role={error ? "alert" : "status"}
      className={cn(
        "text-sm mt-1",
        error ? "text-red-400" : "text-emerald-400",
        className,
      )}
    >
      {message}
    </p>
  );
};

export default FormMessage;
