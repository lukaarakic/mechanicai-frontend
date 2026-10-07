"use client";

import { useState, useTransition } from "react";
import ProfileForm from "./ProfileForm";
import CarForm from "./CarForm";
import Button from "../ui/Button";
import FormMessage from "../ui/FormMessage";
import { onboardingAction } from "@/app/lib/actions/onboarding";
import { OnboardingData, OnboardingErrorState } from "@/app/types/onboarding";
import { CarSchema } from "@/app/lib/validations/car-validation";
import { ProfileSchema } from "@/app/lib/validations/onboarding-validation";
import { avatarUrl } from "@/app/utils/random-seed";

const firstErrors = (issues: { path: PropertyKey[]; message: string }[]) => {
  const errors: OnboardingErrorState = {};
  for (const issue of issues) {
    const field = String(issue.path[0]) as keyof OnboardingErrorState;
    errors[field] ??= issue.message;
  }
  return errors;
};

// `initialSeed` must be the same on server and client (a random one would
// render a different avatar than the one that gets saved).
const OnboardingForm = ({ initialSeed }: { initialSeed: string }) => {
  const [data, setData] = useState<OnboardingData>(() => ({
    profile: { first_name: "", last_name: "", avatar: avatarUrl(initialSeed) },
    car: { id: "", make: "", model: "", year: "", size: "", power: "" },
  }));
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<OnboardingErrorState>({});
  const [isPending, startTransition] = useTransition();

  const handleStepChange = () => {
    setErrors({});

    if (step === 0) {
      const profile = ProfileSchema.safeParse(data.profile);
      if (profile.success) setStep(1);
      else setErrors(firstErrors(profile.error.issues));
      return;
    }

    const car = CarSchema.safeParse(data.car);
    if (!car.success) {
      setErrors(firstErrors(car.error.issues));
      return;
    }

    startTransition(async () => {
      const result = await onboardingAction(data);
      if (result.success) return;

      setErrors(result.errors);
      if (result.errors.first_name || result.errors.last_name) setStep(0);
    });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/60 py-6 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
        className="relative w-full max-w-lg mx-4"
      >
        <div className="absolute -inset-px rounded-2xl bg-linear-to-b from-white/10 to-white/0 pointer-events-none" />
        <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black/60 p-6 sm:p-8">
          <div className="mb-6">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs text-white/50 tracking-wide">
                Step {step + 1} of 2
              </span>
            </div>
            <h2
              id="onboarding-title"
              className="text-2xl font-semibold tracking-tight text-white"
            >
              {step === 0 ? "Set up your profile" : "Add your car"}
            </h2>
            <p className="mt-1.5 text-sm text-white/40">
              {step === 0
                ? "Personalize your profile before we get started."
                : "DashClue tailors every diagnosis to your vehicle."}
            </p>
          </div>

          {step === 0 && (
            <ProfileForm data={data} errors={errors} setData={setData} />
          )}
          {step === 1 && (
            <CarForm errors={errors} data={data} setData={setData} />
          )}

          <FormMessage error={errors.general} className="mt-4" />

          <div className="mt-8 flex gap-3">
            {step === 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(0)}
                disabled={isPending}
                className="w-full"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleStepChange}
              disabled={isPending}
              className="w-full"
            >
              {step === 0 ? "Continue →" : isPending ? "Saving…" : "Finish"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
