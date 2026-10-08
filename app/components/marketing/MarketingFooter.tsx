import Link from "next/link";
import WhiteLogo from "@/app/assets/logo-white.svg";
import { CONTACT_EMAIL } from "@/app/lib/site";

const LINKS = [
  { href: "/codes", label: "OBD2 codes" },
  { href: "/problems", label: "Car problems" },
  { href: "/blog", label: "Blog" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/refund-policy", label: "Refund policy" },
  { href: "/cookie-policy", label: "Cookies" },
];

const MarketingFooter = () => (
  <footer id="site-footer" className="border-t border-white/6">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
      <div className="max-w-sm">
        <div className="flex items-center gap-2">
          <WhiteLogo className="h-6 w-6" aria-hidden />
          <span className="text-sm font-semibold text-white">DashClue</span>
        </div>
        <p className="mt-2 text-sm text-white/60">
          Your AI mechanic, on call 24/7.
        </p>
        <p className="mt-4 text-xs leading-relaxed text-white/50">
          DashClue gives guidance, not a professional inspection. If your
          brakes, steering or a warning light feel unsafe, stop driving and
          contact a mechanic.
        </p>
      </div>

      <nav
        aria-label="Footer"
        className="flex flex-wrap gap-x-6 gap-y-3 text-sm"
      >
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-white/60 transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        ))}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-white/60 transition-colors hover:text-white"
        >
          Contact
        </a>
      </nav>
    </div>
    <p className="mx-auto max-w-6xl px-4 pb-8 text-xs text-white/40 sm:px-6">
      © {new Date().getFullYear()} DashClue. All rights reserved.
    </p>
  </footer>
);

export default MarketingFooter;
