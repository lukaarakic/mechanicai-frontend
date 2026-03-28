"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SettingsLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`rounded-lg px-3 py-2 text-sm transition-colors ${
        isActive
          ? "bg-white/10 text-white"
          : "text-white/40 hover:bg-white/5 hover:text-white/70"
      }`}
    >
      {children}
    </Link>
  );
};

export default SettingsLink;
