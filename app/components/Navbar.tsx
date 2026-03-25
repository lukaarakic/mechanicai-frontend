"use client";

import { FC, useState } from "react";
import { Popover } from "react-tiny-popover";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Button from "@/app/components/ui/button";
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
    car: {
      id: string;
    }[];
    subscription: {
      status: string;
    } | null;
  };
}

const Navbar: FC<NavbarProps> = ({ user }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="fixed bottom-0 z-50 grid w-full grid-cols-5 place-items-center items-center rounded-br-7 rounded-tr-7 bg-light-gray shadow-small md:top-0 md:flex md:h-full md:min-h-dvh md:w-80 md:flex-col md:py-20">
      <Link href="/">
        <WhiteLogo className={`w-12 h-12`} />
      </Link>

      <div className="hidden h-px my-15 w-full bg-white/20 md:block" />

      <Link
        href="/sessions/1"
        className={`border border-white rounded-sm p-2 mb-15 ${
          isActive("/sessions/1") ? "text-blue-800" : "text-white"
        }`}
      >
        <NewChatIcon className={`fill-current h-7 w-7`} />
      </Link>

      <Link
        href="/"
        className={`hidden md:block mb-15 ${isActive("/") ? "text-blue-800" : "text-white"}`}
      >
        <HomeIcon className={`fill-current h-7 w-7`} />
      </Link>

      <Link
        href="/history"
        className={`md:mb-auto ${isActive("/history") ? "text-blue-800" : "text-white"}`}
      >
        <HistoryIcon className={`fill-current h-8 w-8`} />
      </Link>

      <Link
        href="/settings"
        className={`mb-15 ${isActive("/settings") ? "text-blue-800" : "text-white"}`}
      >
        <SettingsIcon className={`fill-current h-7 w-7`} />
      </Link>

      <Popover
        containerClassName="z-[60] left-15"
        isOpen={isPopoverOpen}
        positions={["right", "bottom"]}
        content={
          <div className="mr-5 min-w-64 rounded-lg border border-white/25 bg-light-gray p-20 md:ml-10 md:mb-20">
            <p className="text-16 font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="mb-5 text-14 opacity-25">{user.email}</p>

            <p className="mb-5 font-bold">
              Subscription:{" "}
              <span
                className={cn(
                  user.subscription?.status === "ACTIVE"
                    ? "text-green"
                    : "text-red-500",
                )}
              >
                {user.subscription?.status === "ACTIVE" ? "Active" : "Inactive"}
              </span>
            </p>

            <div className="flex items-center gap-10">
              <form method="post" action="/logout">
                <Button variant="destructive" className="py-1! px-25 text-14">
                  Log out
                </Button>
              </form>
              <Button variant="outline" className="py-1! px-25 text-14">
                <Link href="/settings/car">Cars</Link>
              </Button>
            </div>
          </div>
        }
        onClickOutside={() => setIsPopoverOpen(false)}
      >
        <button
          className="w-14 aspect-square rounded-full cursor-pointer"
          onClick={() => setIsPopoverOpen((prevState) => !prevState)}
          aria-label="Toggle Popover"
        >
          <Image
            src={user.avatar}
            alt="User avatar"
            width={35}
            height={35}
            className="h-full w-full rounded-full object-cover"
          />
        </button>
      </Popover>
    </nav>
  );
};

export default Navbar;
