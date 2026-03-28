"use client";

import { FC, useState } from "react";
import CarIcon from "@/app/assets/icons/car-icon.svg";
import { differenceInDays, format, isToday, isYesterday } from "date-fns";
import {
  categoryLabels,
  categoryStyles,
  DiagnosticCategory,
} from "@/app/utils/categories";
import { cn } from "@/app/lib/cn";
import Link from "next/link";

interface HistoryCardProps {
  title: string;
  time: string;
  id: string;
  category: string | null;
  car: {
    make: string;
    model: string;
    year: number;
    size: number;
    power: number;
  } | null;
}

function getRelativeDateLabel(date: string): string {
  if (isToday(date)) return format(date, "h:mm a");
  if (isYesterday(date)) return "Yesterday";
  const daysAgo = differenceInDays(new Date(), date);
  if (daysAgo <= 7) return "Last 7 days";
  if (daysAgo <= 30) return "Last 30 days";
  return "Older";
}

const HistoryCard: FC<HistoryCardProps> = ({
  title,
  time,
  id,
  category,
  car,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Link
      href={`/chat/${id}`}
      className="group relative flex w-full flex-col rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.05]"
    >
      <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <p className="mb-4 line-clamp-2 text-sm font-medium leading-snug text-white/90">
        {title}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3">
        <div className="relative flex items-center gap-2">
          <div
            className="relative"
            onMouseEnter={() => setIsPopoverOpen(true)}
            onMouseLeave={() => setIsPopoverOpen(false)}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors hover:border-white/20 hover:bg-white/10">
              <CarIcon className="w-4 fill-white/50" />
            </div>

            <div
              className={cn(
                "absolute bottom-full left-0 z-50 mb-2 min-w-52 rounded-xl border border-white/10 bg-[#111] p-3 shadow-xl shadow-black/40 transition-all duration-150",
                isPopoverOpen
                  ? "pointer-events-auto visible translate-y-0 opacity-100"
                  : "pointer-events-none invisible translate-y-1 opacity-0",
              )}
            >
              {car !== null ? (
                <div className="flex flex-col gap-1.5">
                  <p className="mb-1 text-xs font-semibold text-white/30 uppercase tracking-widest">
                    Vehicle
                  </p>
                  {[
                    ["Brand", car.make],
                    ["Model", car.model],
                    ["Year", car.year],
                    ["Engine", `${car.size}cc`],
                    ["Power", `${car.power}kW`],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4"
                    >
                      <span className="text-xs text-white/30">{label}</span>
                      <span className="text-xs text-white/80">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-white/30">Vehicle deleted</p>
              )}
            </div>
          </div>

          <span className="text-xs text-white/30">
            {getRelativeDateLabel(time)}
          </span>
        </div>

        {category && (
          <span
            className={cn(
              "rounded-md px-2 py-0.5 text-xs font-medium",
              categoryStyles[category as DiagnosticCategory],
            )}
          >
            {categoryLabels[category as DiagnosticCategory]}
          </span>
        )}
      </div>
    </Link>
  );
};

export default HistoryCard;
