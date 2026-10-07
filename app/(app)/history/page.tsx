import type { Metadata } from "next";
import LockedHistory from "@/app/components/history/LockedHistory";
import PaginatedHistory from "@/app/components/history/PaginatedHistory";
import { getChats } from "@/app/lib/actions/chat/get-chats";
import { getUser } from "@/app/lib/get-user";

export const metadata: Metadata = {
  title: "History",
  description: "Browse all of your previous vehicle diagnostics.",
};

const History = async () => {
  const { subscribed } = await getUser();
  const chats = subscribed ? await getChats() : [];

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
        <PaginatedHistory initialChats={chats} />
      ) : (
        <LockedHistory />
      )}
    </div>
  );
};

export default History;
