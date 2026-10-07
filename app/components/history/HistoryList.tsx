import HistoryCard from "./HistoryCard";
import { ChatSummary } from "@/app/types/history";

const HistoryList = ({ solutions }: { solutions: ChatSummary[] }) => {
  if (solutions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-white/[0.02] py-20 text-center">
        <p className="text-sm font-medium text-white/50">No diagnostics yet</p>
        <p className="mt-1 text-xs text-white/30">
          Your history will appear here
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {solutions.map((solution) => (
        <li key={solution.id} className="flex">
          <HistoryCard chat={solution} />
        </li>
      ))}
    </ul>
  );
};

export default HistoryList;
