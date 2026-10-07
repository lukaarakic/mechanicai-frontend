"use client";

import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpDown,
  BatteryCharging,
  CircleDot,
  CircleQuestionMark,
  Cog,
  Disc3,
  Fuel,
  Navigation,
  Radar,
  Settings2,
  Thermometer,
  Wind,
  Zap,
} from "lucide-react";
import { savePendingProblem } from "@/app/lib/pending-problem";

const PROBLEMS = [
  { label: "Brakes", icon: Disc3 },
  { label: "Engine", icon: Cog },
  { label: "Battery", icon: BatteryCharging },
  { label: "Cooling", icon: Thermometer },
  { label: "Electrical", icon: Zap },
  { label: "Suspension", icon: ArrowUpDown },
  { label: "Steering", icon: Navigation },
  { label: "Transmission", icon: Settings2 },
  { label: "Fuel system", icon: Fuel },
  { label: "Exhaust", icon: Wind },
  { label: "Tires", icon: CircleDot },
  { label: "Sensors", icon: Radar },
  { label: "Something else", icon: CircleQuestionMark },
];

// Each tile starts a diagnosis with the area pre-filled after signup.
const ProblemGrid = () => {
  const router = useRouter();

  const start = (label: string) => {
    savePendingProblem(
      label === "Something else"
        ? ""
        : `Problem with my ${label.toLowerCase()}: `,
    );
    router.push("/register");
  };

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {PROBLEMS.map(({ label, icon: Icon }) => (
        <li key={label}>
          <button
            type="button"
            onClick={() => start(label)}
            className="group flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-4 text-left text-sm text-white/80 transition-colors hover:border-white/20 hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <span className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-white/60" aria-hidden />
              {label}
            </span>
            <ArrowRight
              className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-white/70"
              aria-hidden
            />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ProblemGrid;
