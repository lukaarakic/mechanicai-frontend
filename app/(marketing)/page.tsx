import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  DollarSign,
  ListChecks,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import ProblemInput from "../components/landing/ProblemInput";
import PhoneMock from "../components/landing/PhoneMock";
import SampleDiagnosis from "../components/landing/SampleDiagnosis";
import ProblemGrid from "../components/landing/ProblemGrid";
import MobileStickyCta from "../components/landing/MobileStickyCta";
import { ButtonLink } from "../components/ui/Button";
import { PRO_PRICE, SITE_URL } from "../lib/site";

const DESCRIPTION =
  "Describe your car problem, answer a few quick questions, and see what's likely wrong, how serious it is, and what it should cost to fix. Free to start.";

export const metadata: Metadata = {
  title: { absolute: "DashClue – Know what's wrong with your car" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
};

const HERO_ID = "hero";
const HERO_INPUT_ID = "hero-problem";
const FINAL_CTA_ID = "get-started";
// Stable reference so the sticky CTA doesn't re-subscribe on every render.
const STICKY_CTA_HIDE_IDS = [HERO_ID, FINAL_CTA_ID, "site-footer"];

const STEPS = [
  {
    icon: MessageSquare,
    title: "Describe the problem",
    text: "Tell us what's happening with your car in plain words.",
  },
  {
    icon: ListChecks,
    title: "Answer a few questions",
    text: "We ask up to 3 short questions, just like a mechanic would.",
  },
  {
    icon: Sparkles,
    title: "Get your diagnosis",
    text: "See what's likely wrong, how serious it is, and what it should cost.",
  },
];

const ANSWERS = [
  {
    icon: ShieldCheck,
    title: "Is it safe to drive?",
    text: "Know whether you can keep driving or should stop and get help.",
  },
  {
    icon: Search,
    title: "What's likely wrong?",
    text: "The most likely causes, ranked, with a quick check for each.",
  },
  {
    icon: Wrench,
    title: "Can I fix it myself?",
    text: "How hard the job is, which tools you need, and the main steps.",
  },
  {
    icon: DollarSign,
    title: "What will it cost?",
    text: "A repair cost range so you know what to expect at the shop.",
  },
];

const PLANS = [
  {
    name: "Free",
    tagline: "For the occasional problem.",
    price: "$0",
    features: [
      { text: "3 diagnostics per month", included: true },
      { text: "6 messages per diagnostic", included: true },
      { text: "1 car", included: true },
      { text: "Standard AI model", included: true },
      { text: "History of past diagnostics", included: false },
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    tagline: "For drivers who want answers anytime.",
    price: PRO_PRICE,
    features: [
      { text: "Unlimited diagnostics", included: true },
      { text: "Unlimited follow-up questions", included: true },
      { text: "Multiple cars", included: true },
      { text: "Our most capable AI model", included: true },
      { text: "History of past diagnostics", included: true },
    ],
    highlighted: true,
  },
];

const FAQ = [
  {
    q: "Is it really free?",
    a: "Yes. The free plan includes 3 diagnostics a month with up to 6 messages each, for one car. No card needed.",
  },
  {
    q: "How accurate is it?",
    a: "DashClue uses your car's details and your answers to narrow down the most likely causes. It's a strong starting point, but it can't inspect your car and can be wrong, so confirm with a mechanic before expensive or safety-related repairs.",
  },
  {
    q: "Does it replace a mechanic?",
    a: "No. It helps you understand the problem, decide how urgent it is, and talk to a mechanic with confidence.",
  },
  {
    q: "Which cars does it work with?",
    a: "Most passenger cars. You add the make, model, year, engine size and power once, and every diagnosis is tailored to it.",
  },
  {
    q: "What does Pro add?",
    a: `Unlimited diagnostics and follow-up questions, multiple cars, your full diagnostic history and our most capable AI model, for ${PRO_PRICE} a month.`,
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, in Settings. You keep Pro until the end of the month you paid for, and your first payment comes with a 14-day refund.",
  },
  {
    q: "What happens to my data?",
    a: "We use it only to run DashClue. Your messages are processed by our AI provider, which doesn't train on them, and you can delete your account and data anytime.",
  },
  {
    q: "Is my payment information safe?",
    a: "Payments are handled by Paddle, our payment provider. We never see or store your card details.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DashClue",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description: DESCRIPTION,
  offers: [
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
    {
      "@type": "Offer",
      name: "Pro",
      price: PRO_PRICE.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
    },
  ],
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-3 text-xs font-semibold tracking-widest text-blue-300 uppercase">
    {children}
  </p>
);

const Landing = () => (
  <>
    <script
      type="application/ld+json"
      // Static content defined above, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />

    {/* Hero */}
    <section
      id={HERO_ID}
      className="relative overflow-hidden border-b border-white/6"
    >
      <div className="pointer-events-none absolute -top-48 right-0 h-[36rem] w-[36rem] rounded-full bg-blue-600/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 md:py-24 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Eyebrow>Your AI mechanic</Eyebrow>
          <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Know what&apos;s wrong with your car{" "}
            <span className="by-the-sea">before the garage tells you.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/70">
            Describe the problem, answer a few quick questions, and see
            what&apos;s likely wrong, how serious it is, and what it should cost
            to fix.
          </p>
          <ProblemInput inputId={HERO_INPUT_ID} className="mt-8 max-w-xl" />
        </div>
        <div className="hidden lg:block">
          <PhoneMock />
        </div>
      </div>
    </section>

    {/* Sample diagnosis */}
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:py-24 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
      <div>
        <Eyebrow>Example diagnosis</Eyebrow>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          A clear answer, not just a guess.
        </h2>
        <p className="mt-4 text-white/70">
          This is what you get after a few questions: practical advice you can
          act on, in plain language.
        </p>
        <p className="mt-6 rounded-xl border border-white/8 bg-white/[0.02] p-4 text-sm text-white/60">
          DashClue gives guidance, not a professional inspection. If your
          brakes, steering or a warning light feel unsafe, stop driving and
          contact a mechanic.
        </p>
      </div>
      <SampleDiagnosis />
    </section>

    {/* How it works */}
    <section
      id="how-it-works"
      className="scroll-mt-24 border-t border-white/6 bg-white/[0.01]"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 sm:px-6">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Your diagnosis in 3 simple steps.
        </h2>
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-6"
            >
              <Icon className="h-6 w-6 text-blue-300" aria-hidden />
              <h3 className="mt-4 font-medium text-white">
                {i + 1}. {title}
              </h3>
              <p className="mt-2 text-sm text-white/60">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* What you get */}
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24 sm:px-6">
      <Eyebrow>What you get</Eyebrow>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        The answers every driver wants.
      </h2>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ANSWERS.map(({ icon: Icon, title, text }) => (
          <li
            key={title}
            className="rounded-2xl border border-white/8 bg-white/[0.02] p-6"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Icon className="h-5 w-5 text-white" aria-hidden />
            </span>
            <h3 className="mt-4 font-medium text-white">{title}</h3>
            <p className="mt-2 text-sm text-white/60">{text}</p>
          </li>
        ))}
      </ul>
    </section>

    {/* Problems we cover */}
    <section className="border-t border-white/6 bg-white/[0.01]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 sm:px-6">
        <Eyebrow>Problems we cover</Eyebrow>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Diagnose any car problem.
        </h2>
        <p className="mt-3 mb-12 text-white/70">
          From warning lights to strange noises. Pick an area to start.
        </p>
        <ProblemGrid />
      </div>
    </section>

    {/* Pricing */}
    <section
      id="pricing"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 md:py-24 sm:px-6"
    >
      <Eyebrow>Pricing</Eyebrow>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Simple and transparent.
      </h2>
      <p className="mt-3 text-white/70">
        Start for free and upgrade anytime if you need more.
      </p>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={
              plan.highlighted
                ? "relative rounded-2xl border border-blue-400/40 bg-gradient-to-br from-blue-500/10 to-fuchsia-500/10 p-6 sm:p-8"
                : "rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            }
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-6 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                Recommended
              </span>
            )}
            <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
            <p className="mt-1 text-sm text-white/60">{plan.tagline}</p>
            <p className="mt-5 text-4xl font-semibold text-white">
              {plan.price}
              <span className="text-base font-normal text-white/50">
                {" "}
                / month
              </span>
            </p>
            <ul className="mt-6 flex flex-col gap-2.5">
              {plan.features.map((feature) => (
                <li
                  key={feature.text}
                  className={`flex items-center gap-2 text-sm ${feature.included ? "text-white/80" : "text-white/40"}`}
                >
                  {feature.included ? (
                    <Check className="h-4 w-4 text-emerald-400" aria-hidden />
                  ) : (
                    <X className="h-4 w-4 text-white/30" aria-hidden />
                  )}
                  <span className={feature.included ? "" : "line-through"}>
                    {feature.text}
                  </span>
                  {!feature.included && (
                    <span className="sr-only">(not included)</span>
                  )}
                </li>
              ))}
            </ul>
            <ButtonLink href="/register" className="mt-8 w-full">
              Start free diagnosis
            </ButtonLink>
            {plan.highlighted && (
              <p className="mt-3 text-center text-xs text-white/50">
                Start free, upgrade anytime. 14-day refund on your first
                payment.
              </p>
            )}
          </div>
        ))}
      </div>
    </section>

    {/* FAQ */}
    <section
      id="faq"
      className="scroll-mt-24 border-t border-white/6 bg-white/[0.01]"
    >
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-24 sm:px-6">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Got questions?
        </h2>
        <div className="mt-12 flex flex-col gap-3">
          {FAQ.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4 open:bg-white/[0.04]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-white [&::-webkit-details-marker]:hidden">
                {q}
                <span
                  aria-hidden
                  className="text-xl leading-none text-white/50 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{a}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-sm text-white/60">
          More details in our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-2 hover:text-white"
          >
            Terms
          </Link>
          ,{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-white"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/refund-policy"
            className="underline underline-offset-2 hover:text-white"
          >
            Refund Policy
          </Link>
          .
        </p>
      </div>
    </section>

    {/* Final CTA */}
    <section
      id={FINAL_CTA_ID}
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24"
    >
      <div className="grid items-center gap-8 rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-fuchsia-500 p-6 sm:p-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Find out what&apos;s wrong with your car now.
          </h2>
          <p className="mt-3 text-white/90">
            Type your problem and get a diagnosis in about 2 minutes.
          </p>
        </div>
        <div className="rounded-2xl bg-black/70 p-4 backdrop-blur-sm">
          <ProblemInput />
        </div>
      </div>
    </section>

    <MobileStickyCta
      hideWhenVisibleIds={STICKY_CTA_HIDE_IDS}
      heroId={HERO_ID}
      inputId={HERO_INPUT_ID}
    />
  </>
);

export default Landing;
