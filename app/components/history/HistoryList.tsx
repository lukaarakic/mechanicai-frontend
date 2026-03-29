import HistoryCard from "./HistoryCard";
import { FC } from "react";

interface Chat {
  id: string;
  created_at: string;
  title: string;
  category: string | null;
  car: {
    make: string;
    model: string;
    year: number;
    size: number;
    power: number;
  };
}

interface HistoryListProps {
  solutions: Chat[];
  variant?: "big" | "small";
}

const HistoryList: FC<HistoryListProps> = ({ solutions }) => {
  if (solutions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-white/[0.02] py-20 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
          🔍
        </div>
        <p className="text-sm font-medium text-white/50">No diagnostics yet</p>
        <p className="mt-1 text-xs text-white/20">
          Your history will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {solutions.map((solution) => (
        <HistoryCard
          key={solution.id}
          car={solution.car}
          id={solution.id}
          title={solution.title}
          time={solution.created_at}
          category={solution.category}
        />
      ))}
    </div>
  );
};

export default HistoryList;
