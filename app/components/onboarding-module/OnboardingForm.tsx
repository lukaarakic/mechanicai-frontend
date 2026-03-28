"use client";

import { useState } from "react";
import ProfileForm from "./ProfileForm";
import CarForm from "./CarForm";
import Button from "../ui/button";
import { onboardingAction } from "@/app/lib/actions/onboarding";
import { OnboardingData } from "@/app/types/onboarding";

const OnboardingForm = () => {
  const [data, setData] = useState<OnboardingData>({
    profile: {
      first_name: "",
      last_name: "",
      avatar: "",
    },
    car: {
      make: "",
      model: "",
      year: "",
      size: "",
      power: "",
    },
  });

  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  const handleStepChange = () => {
    setError("");

    if (step === 0) {
      if (
        data.profile.first_name.length > 2 &&
        data.profile.last_name.length > 2 &&
        data.profile.avatar.length > 2
      ) {
        setStep((prev) => prev + 1);
      } else {
        setError("Please fill out all fields before continuing.");
      }
    } else if (step === 1) {
      if (
        data.car.make &&
        data.car.model &&
        data.car.year &&
        data.car.size &&
        data.car.power
      ) {
        onboardingAction(data);
      } else {
        setError("Please fill out all car fields before continuing.");
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

          {step === 0 && <ProfileForm data={data} setData={setData} />}
          {step === 1 && <CarForm data={data} setData={setData} />}

          <Button
            onClick={handleStepChange}
            className="mt-20 mb-10 cursor-pointer w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black transition-all hover:bg-white/90 active:scale-[0.98]"
          >
            {step === 1 ? "Finish" : "Continue →"}
          </Button>
          <p className="text-sm text-red-400">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
