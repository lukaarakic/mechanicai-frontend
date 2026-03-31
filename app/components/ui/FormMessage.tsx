type FormMessageProps = {
  error?: string;
  success?: string;
  className?: string;
};

const FormMessage = ({ error, success, className }: FormMessageProps) => {
  return (
    <div className="relative h-4">
      <p
        className={`absolute text-sm ${error ? "text-red-500" : ""} ${success ? "text-green-500" : ""} ${className || ""}`}
      >
        {error ?? success}
      </p>
    </div>
  );
};

export default FormMessage;
