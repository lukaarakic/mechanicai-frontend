import type { Metadata } from "next";
import Link from "next/link";
import Button from "../components/ui/Button";
import { getUser } from "../lib/get-user";
import { getJWT } from "../lib/get-jwt";
import HistoryList from "../components/history/HistoryList";

export const metadata: Metadata = {
  title: "Dashboard | MechanicAI",
  description: "View recent diagnostics and start a new vehicle chat.",
};

const Index = async () => {
  const user = await getUser();
  const token = await getJWT();

  let response;
  let chats = [];

  if (user.subscribed) {
    response = await fetch(`${process.env.API_URL}/chats?limit=3`, {
      method: "GET",
      headers: { Authorization: `${token}` },
    });

    chats = response.ok ? await response.json() : [];
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6">
      <div className="pointer-events-none fixed left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-3xl" />

      <div className="relative text-center mb-12">
        <h1 className="by-the-sea mb-3 text-5xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
          Hi there, {user?.first_name}.
        </h1>
        <p className="text-lg text-white/30">
          What would you like to fix today?
        </p>
      </div>

      <div className="w-full max-w-3xl mb-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/20">
          Recent
        </p>

        {user.subscribed && chats?.length === 0 ? (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-8 text-center">
            <p className="text-sm text-white/20">No history yet</p>
          </div>
        ) : !user.subscribed ? (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-8 text-center">
            <p className="font-medium text-white/50">Your history is locked</p>
            <p className="mt-1 text-sm text-white/20 mb-6">
              Upgrade to Pro to see diagnostics.
            </p>

            <Button>
              <Link href="/settings/subscription">Unlock History</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <HistoryList solutions={chats} />
          </div>
        )}
      </div>

      <Button>
        <Link href="/chat">Create new chat</Link>
      </Button>
    </div>
  );
};

export default Index;
