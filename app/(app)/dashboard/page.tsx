import type { Metadata } from "next";
import { ButtonLink } from "../../components/ui/Button";
import { getUser } from "../../lib/get-user";
import HistoryList from "../../components/history/HistoryList";
import LockedHistory from "../../components/history/LockedHistory";
import { getChats } from "../../lib/actions/chat/get-chats";
import PendingProblemRedirect from "./PendingProblemRedirect";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View recent diagnostics and start a new vehicle chat.",
};

const Index = async () => {
  const user = await getUser();
  const chats = user.subscribed ? await getChats({ limit: 3 }) : [];

  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center px-6 py-10">
      <PendingProblemRedirect />
      <div className="pointer-events-none fixed left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-3xl" />

      <div className="relative text-center mb-12">
        <h1 className="by-the-sea mb-3 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          {user.first_name ? `Hi there, ${user.first_name}.` : "Hi there."}
        </h1>
        <p className="text-lg text-white/40">
          What would you like to fix today?
        </p>
      </div>

      <ButtonLink href="/chat" className="mb-16">
        Start a new diagnostic
      </ButtonLink>

      <div className="w-full max-w-3xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/30">
          Recent
        </p>

        {user.subscribed ? (
          <HistoryList solutions={chats} />
        ) : (
          <LockedHistory />
        )}
      </div>
    </div>
  );
};

export default Index;
