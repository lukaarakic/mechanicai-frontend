import SettingsLink from "./SettingsLink";

const links = [
  { href: "/settings/account", label: "Account" },
  { href: "/settings/cars", label: "Cars" },
  { href: "/settings/subscription", label: "Subscription" },
];

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-10 mb-24 w-full px-4 py-8 sm:mt-32 sm:px-6 sm:py-10 lg:mt-40">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-white/50 tracking-wide">
              Preferences
            </span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Settings
          </h1>
          <p className="mt-1.5 text-sm text-white/40">
            Manage your account and preferences
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
          <aside className="w-full shrink-0 lg:w-48">
            <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0">
              {links.map((link) => (
                <SettingsLink key={link.href} href={link.href}>
                  {link.label}
                </SettingsLink>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 flex-1 rounded-2xl border border-white/6 bg-white/2 p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
