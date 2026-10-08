import Link from "next/link";
import WhiteLogo from "@/app/assets/logo-white.svg";
import { ButtonLink } from "../ui/Button";

const NAV = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/codes", label: "OBD2 codes" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

const MarketingHeader = () => (
  <header className="sticky top-0 z-40 border-b border-white/6 bg-black/80 backdrop-blur-md">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
      <Link
        href="/"
        className="flex items-center gap-2"
        aria-label="DashClue home"
      >
        <WhiteLogo className="h-7 w-7" aria-hidden />
        <span className="text-sm font-semibold text-white">DashClue</span>
      </Link>

      <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <ButtonLink href="/login" variant="outline" className="px-3 py-2">
          Log in
        </ButtonLink>
        <ButtonLink
          href="/register"
          className="hidden px-3 py-2 sm:inline-flex"
        >
          Start free diagnosis
        </ButtonLink>
      </div>
    </div>
  </header>
);

export default MarketingHeader;
