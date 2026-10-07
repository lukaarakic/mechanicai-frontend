import CarIcon from "@/app/assets/icons/car-icon.svg";
import { format, isThisYear, isToday, isYesterday } from "date-fns";
import {
  categoryLabels,
  categoryStyles,
  isValidCategory,
} from "@/app/utils/categories";
import { cn } from "@/app/lib/cn";
import Link from "next/link";
import { ChatSummary } from "@/app/types/history";

function getDateLabel(date: string): string {
  if (isToday(date)) return format(date, "h:mm a");
  if (isYesterday(date)) return "Yesterday";
  return format(date, isThisYear(date) ? "MMM d" : "MMM d, yyyy");
}

const HistoryCard = ({ chat }: { chat: ChatSummary }) => {
  const { id, title, created_at, category, car } = chat;

  return (
    <Link
      href={`/chat/${id}`}
      className="relative flex w-full flex-col rounded-2xl border border-white/8 bg-white/2 p-4 transition-all duration-200 hover:border-white/15 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
    >
      <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <p className="mb-6 line-clamp-2 text-sm font-medium leading-snug text-white/90">
        {title ?? "Diagnostic session"}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 text-xs text-white/40">
          <CarIcon aria-hidden className="w-4 shrink-0 fill-white/40" />
          <span className="truncate">
            {car ? `${car.make} ${car.model} · ${car.year}` : "Vehicle removed"}
          </span>
          <span aria-hidden>·</span>
          <time dateTime={created_at} className="shrink-0">
            {getDateLabel(created_at)}
          </time>
        </div>

        {category && isValidCategory(category) && (
          <span
            className={cn(
              "shrink-0 rounded-md px-2 py-0.5 text-xs font-medium",
              categoryStyles[category],
            )}
          >
            {categoryLabels[category]}
          </span>
        )}
      </div>
    </Link>
  );
};

export default HistoryCard;
