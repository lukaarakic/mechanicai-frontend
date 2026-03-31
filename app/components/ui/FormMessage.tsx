type FormMessageProps = {
  error?: string;
  success?: string;
  className?: string;
};

const FormMessage = ({ error, success, className }: FormMessageProps) => {
  return (
    <p
      className={`text-sm mt-1 ${error ? "text-red-500" : "text-green-500"} ${className || ""}`}
    >
      {error ?? success}
    </p>
  );
};

export default FormMessage;
