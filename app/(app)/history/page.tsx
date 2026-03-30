import type { Metadata } from "next";
import HistoryList from "@/app/components/history/HistoryList";
import Button from "@/app/components/ui/Button";
import { getJWT } from "@/app/lib/get-jwt";
import { getUser } from "@/app/lib/get-user";
import Link from "next/link";

export const metadata: Metadata = {
  title: "History | MechanicAI",
  description: "Browse all of your previous vehicle diagnostics.",
};

const History = async () => {
  const token = await getJWT();
  const { subscribed } = await getUser();

  const response = await fetch(`${process.env.API_URL}/chats`, {
    method: "GET",
    headers: { Authorization: `${token}` },
  });

  const chats = response.ok ? await response.json() : [];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-xs text-white/50 tracking-wide">
            Diagnostic history
          </span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Your history
        </h1>
        <p className="mt-1.5 text-sm text-white/40">
          All your past vehicle diagnostics in one place.
        </p>
      </div>

      {subscribed ? (
        <HistoryList solutions={chats} />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-white/[0.02] py-20 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
            🔍
          </div>
          <p className="font-medium text-white/50">Your history is locked</p>
          <p className="mt-1 text-sm text-white/20 mb-6">
            Upgrade to Pro to see diagnostics.
          </p>

          <Button>
            <Link href="/settings/subscription">Unlock History</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default History;
