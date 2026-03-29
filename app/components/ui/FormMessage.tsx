type FormMessageProps = {
  error?: string;
  success?: string;
  className?: string;
};

const FormMessage = ({ error, success, className }: FormMessageProps) => {
  if (error)
    return <p className={`text-sm text-red-500 ${className || ""}`}>{error}</p>;
  if (success)
    return (
      <p className={`text-sm text-green-500 ${className || ""}`}>{success}</p>
    );
  return null;
};

export default FormMessage;
