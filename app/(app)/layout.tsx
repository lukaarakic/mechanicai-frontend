import Navbar from "../components/Navbar";
import OnboardingForm from "../components/onboarding/OnboardingForm";
import { getUser } from "../lib/get-user";

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    // Column on mobile so the bottom nav takes real space instead of covering
    // the end of the scrolling content (e.g. the chat input).
    <div className="flex h-svh flex-col bg-black md:flex-row">
      <Navbar user={user} />

      {/* relative: absolutely positioned content (e.g. sr-only text) must sit in
          this scroller, not the window, or the page gets a second scrollbar. */}
      <main className="relative min-h-0 w-full flex-1 overflow-y-auto md:ml-16">
        {children}
      </main>

      {!user.onboarding_done && (
        <OnboardingForm initialSeed={user.id.replace(/[^A-Za-z0-9]/g, "")} />
      )}
    </div>
  );
}

export default Layout;
