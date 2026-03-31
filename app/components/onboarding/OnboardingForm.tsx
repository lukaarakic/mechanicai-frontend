"use client";

import { useState } from "react";
import ProfileForm from "./ProfileForm";
import CarForm from "./CarForm";
import Button from "../ui/Button";
import { onboardingAction } from "@/app/lib/actions/onboarding";
import { OnboardingData, OnboardingErrorState } from "@/app/types/onboarding";

const OnboardingForm = () => {
  const [data, setData] = useState<OnboardingData>({
    profile: {
      first_name: "",
      last_name: "",
      avatar: "",
    },
    car: {
      id: "",
      make: "",
      model: "",
      year: "",
      size: "",
      power: "",
    },
  });

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<OnboardingErrorState>({});

  const handleStepChange = async () => {
    setErrors({});

    if (step === 0) {
      const profileValid =
        data.profile.first_name.length > 2 &&
        data.profile.last_name.length > 2 &&
        data.profile.avatar.length > 2;

      if (profileValid) {
        setStep((prev) => prev + 1);
      } else {
        setErrors({ general: "Please fill out all fields before continuing." });
      }
      return;
    }

    if (step === 1) {
      const carValid =
        data.car.make &&
        data.car.model &&
        data.car.year &&
        data.car.size &&
        data.car.power;

      if (!carValid) {
        setErrors({
          general: "Please fill out all car fields before continuing.",
        });
        return;
      }

      const result = await onboardingAction(data);

      if (result.success) return;

      if ("errors" in result && result.errors) {
        const errors = result.errors as OnboardingErrorState;
        setErrors(errors);

        if (errors.first_name || errors.last_name) {
          setStep(0);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg mx-4">
        <div className="absolute -inset-px rounded-2xl bg-linear-to-b from-white/10 to-white/0 pointer-events-none" />
        <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black/60 p-8">
          <div className="mb-3">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs text-white/50 tracking-wide">
                Almost there
              </span>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              One last step
            </h2>
            <p className="mt-1.5 text-sm text-white/40">
              Personalize your profile before we get started.
            </p>
          </div>

          {step === 0 && (
            <ProfileForm data={data} errors={errors} setData={setData} />
          )}
          {step === 1 && (
            <CarForm errors={errors} data={data} setData={setData} />
          )}

          <div className="flex gap-4 mt-8">
            {step === 1 && (
              <Button
                onClick={() => setStep((prev) => prev - 1)}
                className="mt-20 mb-10 cursor-pointer w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black transition-all hover:bg-white/90 active:scale-[0.98]"
              >
                Go Back
              </Button>
            )}
            <Button
              onClick={handleStepChange}
              className="mt-20 mb-10 cursor-pointer w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black transition-all hover:bg-white/90 active:scale-[0.98]"
            >
              {step === 1 ? "Finish" : "Continue →"}
            </Button>
          </div>
          <p className="text-sm text-red-400">{errors?.general}</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
