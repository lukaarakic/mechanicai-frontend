"use client";

import { FC, useState } from "react";
import { Popover } from "react-tiny-popover";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/cn";

import NewChatIcon from "@/app/assets/icons/new-chat-icon.svg";
import WhiteLogo from "@/app/assets/logo-white.svg";
import HomeIcon from "@/app/assets/icons/home-icon.svg";
import HistoryIcon from "@/app/assets/icons/history-icon.svg";
import SettingsIcon from "@/app/assets/icons/settings-icon.svg";

interface NavbarProps {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    id: string;
    car: { id: string }[];
    subscription: { status: string } | null;
  };
}

const NavLink = ({
  href,
  icon: Icon,
  active,
  label,
}: {
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  active: boolean;
  label: string;
}) => (
  <Link
    href={href}
    aria-label={label}
    className={cn(
      "flex items-center justify-center rounded-xl p-2.5 transition-all duration-150",
      active
        ? "bg-white/10 text-white"
        : "text-white/30 hover:bg-white/5 hover:text-white/70",
    )}
  >
    <Icon className="h-20 w-20 fill-current" />
  </Link>
);

const Navbar: FC<NavbarProps> = ({ user }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isSubscribed = user.subscription?.status === "ACTIVE";

  return (
    <>
      <nav className="py-20 fixed left-0 top-0 z-50 hidden h-dvh w-16 flex-col items-center gap-1 border-r border-white/[0.06] bg-light-black py-5 md:flex">
        <Link href="/" className="mb-4 flex items-center justify-center">
          <WhiteLogo className="h-7 w-7" />
        </Link>

        <div className="mb-3 h-px w-8 bg-white/10" />

        <Link
          href="/sessions/1"
          aria-label="New chat"
          className={cn(
            "mb-3 flex items-center justify-center rounded-xl p-2.5 transition-all",
            isActive("/sessions/1")
              ? "bg-white text-black"
              : "border border-white/10 bg-white/[0.04] text-white/50 hover:border-white/20 hover:bg-white/[0.08] hover:text-white",
          )}
        >
          <NewChatIcon className="h-20 w-20 fill-current" />
        </Link>

        <div className="flex flex-1 flex-col gap-1">
          <NavLink
            href="/"
            icon={HomeIcon}
            active={isActive("/")}
            label="Home"
          />
          <NavLink
            href="/history"
            icon={HistoryIcon}
            active={isActive("/history")}
            label="History"
          />
          <NavLink
            href="/settings"
            icon={SettingsIcon}
            active={isActive("/settings")}
            label="Settings"
          />
        </div>

        {/* Avatar */}
        <Popover
          containerClassName="z-[60]"
          isOpen={isPopoverOpen}
          positions={["right"]}
          align="end"
          content={
            <div className="ml-3 min-w-56 rounded-xl border border-white/10 bg-light-black p-4 shadow-2xl shadow-black/60">
              <div className="mb-3 flex items-center gap-3 border-b border-white/[0.06] pb-3">
                <Image
                  src={user.avatar}
                  alt="avatar"
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="truncate text-xs text-white/30">{user.email}</p>
                </div>
              </div>

              {/* Subscription badge */}
              <div className="mb-3 flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                    isSubscribed
                      ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                      : "border border-white/10 bg-white/5 text-white/30",
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      isSubscribed ? "bg-emerald-400" : "bg-white/20",
                    )}
                  />
                  {isSubscribed ? "Pro" : "Free plan"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-1.5">
                <Link
                  href="/settings/car"
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-center text-xs text-white/60 transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  Manage cars
                </Link>
                <form method="post" action="/logout">
                  <button
                    type="submit"
                    className="w-full rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-all hover:bg-red-500/20 hover:text-red-300"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </div>
          }
          onClickOutside={() => setIsPopoverOpen(false)}
        >
          <button
            onClick={() => setIsPopoverOpen((s) => !s)}
            aria-label="Toggle menu"
            className="relative rounded-full transition-opacity hover:opacity-80"
          >
            <Image
              src={user.avatar}
              alt="User avatar"
              width={36}
              height={36}
              className="rounded-full object-cover ring-1 ring-white/10"
            />
            {isSubscribed && (
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-light-black bg-emerald-400" />
            )}
          </button>
        </Popover>
      </nav>

      {/* Mobile bottom bar */}
      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-white/[0.06] bg-light-black/90 px-4 py-3 backdrop-blur-md md:hidden">
        <NavLink href="/" icon={HomeIcon} active={isActive("/")} label="Home" />
        <NavLink
          href="/history"
          icon={HistoryIcon}
          active={isActive("/history")}
          label="History"
        />

        {/* New chat — center CTA */}
        <Link
          href="/sessions/1"
          aria-label="New chat"
          className="flex items-center justify-center rounded-xl border border-white/15 bg-white/10 p-3 text-white transition-all active:scale-95"
        >
          <NewChatIcon className="h-5 w-5 fill-current" />
        </Link>

        <NavLink
          href="/settings"
          icon={SettingsIcon}
          active={isActive("/settings")}
          label="Settings"
        />

        <button
          onClick={() => setIsPopoverOpen((s) => !s)}
          className="relative"
          aria-label="Profile"
        >
          <Image
            src={user.avatar}
            alt="User avatar"
            width={32}
            height={32}
            className="rounded-full object-cover ring-1 ring-white/10"
          />
          {isSubscribed && (
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-light-black bg-emerald-400" />
          )}
        </button>
      </nav>
    </>
  );
};

export default Navbar;
