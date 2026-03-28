import SettingsLink from "./SettingsLink";

const links = [
  { href: "/settings/account", label: "Account" },
  { href: "/settings/cars", label: "Cars" },
  { href: "/settings/subscription", label: "Subscription" },
];

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full px-6 py-10 mt-40">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-white/50 tracking-wide">
              Preferences
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Settings
          </h1>
          <p className="mt-1.5 text-sm text-white/40">
            Manage your account and preferences
          </p>
        </div>

        <div className="flex gap-6">
          <aside className="w-48 shrink-0">
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <SettingsLink key={link.href} href={link.href}>
                  {link.label}
                </SettingsLink>
              ))}
            </nav>
          </aside>

          <div className="flex-1 min-w-0 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
