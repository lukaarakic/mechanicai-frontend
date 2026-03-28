import { FC } from "react";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

const AuthHeader: FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-semibold tracking-tight text-white">
        {title}
      </h1>
      <p className="mt-1 text-sm leading-relaxed text-white/40">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;
