import {
  OctagonAlert,
  ShieldAlert,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import LogoWhite from "@/app/assets/logo-white.svg";
import type { Diagnosis } from "@/app/types/chat";

const SEVERITY_STYLE: Record<Diagnosis["severity"], string> = {
  Low: "bg-emerald-500/15 text-emerald-300",
  Moderate: "bg-amber-500/15 text-amber-300",
  High: "bg-orange-500/15 text-orange-300",
  Critical: "bg-red-500/15 text-red-300",
};

const DRIVE_SAFETY: Record<
  Diagnosis["drive_safety"],
  { label: string; icon: LucideIcon; className: string }
> = {
  safe: { label: "Safe to drive for now", icon: ShieldCheck, className: "text-emerald-300" },
  caution: { label: "Drive with caution", icon: ShieldAlert, className: "text-amber-300" },
  stop: { label: "Stop driving", icon: OctagonAlert, className: "text-red-300" },
};

const LIKELIHOOD_STYLE: Record<Diagnosis["causes"][number]["likelihood"], string> = {
  High: "bg-red-500/15 text-red-300",
  Medium: "bg-amber-500/15 text-amber-300",
  Low: "bg-white/10 text-white/70",
};

const DIY: Record<Diagnosis["diy"]["verdict"], { label: string; className: string }> = {
  yes: { label: "Yes, it's a reasonable DIY job", className: "text-emerald-300" },
  maybe: { label: "Possible with some experience", className: "text-amber-300" },
  no: { label: "Leave this one to a mechanic", className: "text-white/80" },
};

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

const Panel = ({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={`rounded-xl border border-white/6 bg-white/[0.02] p-4 ${className}`}>
    <h4 className="text-sm font-medium text-white">{title}</h4>
    {children}
  </div>
);

// The diagnosis as a card: shown in the chat for the reply that diagnoses the
// problem, and on the landing page with sample data.
const DiagnosisCard = ({ diagnosis }: { diagnosis: Diagnosis }) => {
  const safety = DRIVE_SAFETY[diagnosis.drive_safety];
  const SafetyIcon = safety.icon;
  const diy = DIY[diagnosis.diy.verdict];
  const [mainCost, ...otherCosts] = diagnosis.costs;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-4 shadow-2xl shadow-black/50 sm:p-6">
      <div className="flex items-center gap-2 text-xs text-white/60">
        <LogoWhite className="h-5 w-5" aria-hidden />
        DashClue diagnosis
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{diagnosis.summary}</h3>
          <p className="mt-1 text-sm text-white/60">{diagnosis.vehicle}</p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-1.5 sm:items-end">
          <span
            className={`rounded-md px-2 py-1 text-xs font-semibold ${SEVERITY_STYLE[diagnosis.severity]}`}
          >
            Severity: {diagnosis.severity}
          </span>
          <span className={`inline-flex items-center gap-1 text-xs ${safety.className}`}>
            <SafetyIcon className="h-3.5 w-3.5" aria-hidden />
            {safety.label}
          </span>
        </div>
      </div>

      {diagnosis.safety_note && (
        <p
          className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
            diagnosis.drive_safety === "stop"
              ? "border-red-500/30 bg-red-500/10 text-red-100"
              : "border-white/6 bg-white/[0.02] text-white/70"
          }`}
        >
          {diagnosis.safety_note}
        </p>
      )}

      {/* Full width with the causes side by side, so a long list doesn't make
          one tall column next to two short boxes. */}
      <Panel title="Most likely causes" className="mt-4">
        <ol className="mt-3 grid gap-x-6 gap-y-4 md:grid-cols-2">
          {diagnosis.causes.map((cause, i) => (
            <li key={cause.name} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-xs text-white/70">
                {i + 1}
              </span>
              <div>
                <p className="flex flex-wrap items-center gap-2 text-sm text-white">
                  {cause.name}
                  <span
                    className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${LIKELIHOOD_STYLE[cause.likelihood]}`}
                  >
                    {cause.likelihood}
                  </span>
                </p>
                {cause.detail && (
                  <p className="mt-0.5 text-sm text-white/60">{cause.detail}</p>
                )}
                {cause.check && (
                  <p className="mt-1.5 text-sm text-white/60">
                    <span className="text-white/80">Quick check:</span> {cause.check}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Panel>

      {/* Grid rows stretch both boxes to the taller one, so their bottoms line up.
          Open DIY steps make that box much taller, so stop stretching then. */}
      <div className="mt-3 grid gap-3 md:grid-cols-2 md:has-[details[open]]:items-start">
        <Panel title="Can you fix it yourself?">
          <p className={`mt-2 inline-flex items-center gap-1.5 text-sm ${diy.className}`}>
            <Wrench className="h-4 w-4" aria-hidden />
            {diy.label}
          </p>
          <p className="mt-1 text-sm text-white/60">
            Difficulty: {diagnosis.diy.difficulty}.
            {diagnosis.diy.summary && ` ${diagnosis.diy.summary}`}
          </p>
          {diagnosis.diy.steps.length > 0 && (
            <details className="group mt-3">
              <summary className="cursor-pointer text-sm text-blue-300 hover:text-blue-200">
                <span className="group-open:hidden">Show the steps</span>
                <span className="hidden group-open:inline">Hide the steps</span>
              </summary>
              <ol className="mt-2 list-decimal pl-5 text-sm text-white/70 marker:text-white/40">
                {diagnosis.diy.steps.map((step) => (
                  <li key={step} className="mb-1">
                    {step}
                  </li>
                ))}
              </ol>
            </details>
          )}
        </Panel>

        {mainCost && (
          <Panel title="Estimated repair cost" className="flex flex-col">
            <p className="mt-2 text-2xl font-semibold text-white">
              {usd(mainCost.low)} – {usd(mainCost.high)}
            </p>
            <p className="mt-1 text-sm text-white/60">
              {mainCost.repair}
              {mainCost.note && `: ${mainCost.note}`}
            </p>
            {otherCosts.length > 0 && (
              <ul className="mt-3 flex flex-col gap-1.5 border-t border-white/6 pt-3 text-sm">
                {otherCosts.map((cost) => (
                  <li key={cost.repair} className="flex justify-between gap-3">
                    <span className="text-white/60">{cost.repair}</span>
                    <span className="shrink-0 text-white/80">
                      {usd(cost.low)} – {usd(cost.high)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {diagnosis.cost_note && (
              <p className="mt-auto pt-3 text-xs text-white/40">{diagnosis.cost_note}</p>
            )}
          </Panel>
        )}
      </div>
    </div>
  );
};

export default DiagnosisCard;
