import HistoryList from "@/app/components/history/HistoryList";
import { getJWT } from "@/app/lib/get-jwt";

const History = async () => {
  const token = await getJWT();

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

      <HistoryList solutions={chats} />
    </div>
  );
};

export default History;
