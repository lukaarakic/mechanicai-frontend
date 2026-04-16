/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import SubscribeButton from "./SubscribeButton";
import CancelButton from "./CancelButton";
import Section from "@/app/components/ui/Section";
import { cn } from "@/app/lib/cn";
import { getSubscription } from "@/app/lib/actions/settings/subscription/get-subscription";

export const metadata: Metadata = {
  title: "Subscription | MechanicAI",
  description: "Manage your MechanicAI plan and billing details.",
};

const FREE_FEATURES = [
  "3 diagnostics per month",
  "1 vehicle",
  "Basic AI model",
  "No history access",
];

const PRO_FEATURES = [
  "Unlimited diagnostics",
  "Multiple vehicles",
  "GPT-5 powered AI",
  "Full diagnostic history",
  "Priority support",
];

const Check = ({ muted = false }: { muted?: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2.5 7L5.5 10L11.5 4"
      stroke={muted ? "rgba(255,255,255,0.2)" : "rgb(52,211,153)"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SubscriptionPage = async () => {
  const subscription = await getSubscription();
  const isPro = subscription.subscribed;
  const isCancelling = subscription.cancel_at_period_end;

  return (
    <div className="flex flex-col">
      <div className="mb-8 border-b border-white/6 pb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-medium text-white">Subscription</p>
            <p className="text-sm text-white/40 mt-0.5">
              Manage your plan and billing.
            </p>
          </div>
          <span
            className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border ${
              isPro
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                : "border-white/10 bg-white/5 text-white/40"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${isPro ? "bg-emerald-400" : "bg-white/30"}`}
            />
            {isPro ? "Pro" : "Free"}
          </span>
        </div>
      </div>

      {isPro && (
        <Section
          title="Current plan"
          description="Your active subscription details."
        >
          <div className="flex flex-col gap-3 rounded-xl border border-white/6 bg-white/2 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-white">
                  MechanicAI Pro
                </span>
                <span
                  className={cn(
                    "rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400",
                    isCancelling &&
                      "border-amber-500/20 bg-amber-500/10 text-amber-400",
                  )}
                >
                  {isCancelling ? "Cancelling" : "Active"}
                </span>
              </div>
              <span className="self-start text-sm font-medium text-white sm:self-auto">
                $7 / month
              </span>
            </div>
            {subscription.renews_at && (
              <p className="text-xs text-white/30">
                {isCancelling
                  ? `Cancels on ${new Date(subscription.renews_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
                  : `Renews on ${new Date(subscription.renews_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
              </p>
            )}
          </div>
        </Section>
      )}

      <Section
        title={isPro ? "Your plan" : "Upgrade to Pro"}
        description={
          isPro
            ? "You're on the Pro plan."
            : "Unlock unlimited diagnostics and more."
        }
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div
            className={`relative flex flex-col gap-4 rounded-xl border p-5 ${
              !isPro
                ? "border-white/15 bg-white/3"
                : "border-white/6 bg-white/1 opacity-60"
            }`}
          >
            <div>
              <p className="text-sm font-medium text-white">Free</p>
              <p className="mt-0.5 text-2xl font-semibold text-white">$0</p>
              <p className="text-xs text-white/30">forever</p>
            </div>
            <ul className="flex flex-col gap-2">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check muted />
                  <span className="text-xs text-white/30">{f}</span>
                </li>
              ))}
            </ul>
            {!isPro && (
              <div className="mt-auto pt-2">
                <div className="w-full rounded-lg border border-white/10 py-2.5 text-center text-xs text-white/30">
                  Current plan
                </div>
              </div>
            )}
          </div>

          <div
            className={`relative flex flex-col gap-4 rounded-xl border p-5 ${
              isPro
                ? "border-emerald-500/20 bg-emerald-500/4"
                : "border-white/15 bg-white/3"
            }`}
          >
            {!isPro && (
              <div className="absolute -top-px left-4 right-4 h-px bg-linear-to-r from-transparent via-emerald-400/40 to-transparent" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-white">Pro</p>
                {!isPro && (
                  <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
                    Recommended
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-2xl font-semibold text-white">$7</p>
              <p className="text-xs text-white/30">per month</p>
            </div>
            <ul className="flex flex-col gap-2">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check />
                  <span className="text-xs text-white/70">{f}</span>
                </li>
              ))}
            </ul>
            {!isPro && (
              <div className="mt-auto pt-2">
                <SubscribeButton />
              </div>
            )}
            {isPro && (
              <div className="mt-auto pt-2">
                <div className="w-full rounded-lg border border-emerald-500/20 py-2 text-center text-xs text-emerald-400">
                  Current plan
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>

      {isPro && !isCancelling && (
        <Section title="Danger zone">
          <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-red-500/15 bg-red-500/4 p-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-red-400">
                Cancel subscription
              </p>
              <p className="text-xs text-white/30 mt-0.5">
                You'll keep Pro access until the end of your billing period.
              </p>
            </div>
            <CancelButton />
          </div>
        </Section>
      )}
    </div>
  );
};

export default SubscriptionPage;
