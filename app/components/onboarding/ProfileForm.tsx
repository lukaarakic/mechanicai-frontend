"use client";

import Field from "@/app/components/ui/Field";
import Image from "next/image";
import { avatarUrl, randomSeed } from "@/app/utils/random-seed";
import { Dispatch, SetStateAction } from "react";
import { OnboardingData, OnboardingErrorState } from "@/app/types/onboarding";
import FormMessage from "@/app/components/ui/FormMessage";

interface ProfileFormProps {
  data: OnboardingData;
  setData: Dispatch<SetStateAction<OnboardingData>>;
  errors?: OnboardingErrorState;
}

const ProfileForm = ({ data, setData, errors }: ProfileFormProps) => {
  const handleRandomAvatar = () => {
    setData((prevData) => ({
      ...prevData,
      profile: { ...prevData.profile, avatar: avatarUrl(randomSeed()) },
    }));
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      profile: {
        ...prevData.profile,
        [name]: value,
      },
    }));
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col items-center gap-4 rounded-xl border border-white/6 bg-white/3 py-6 px-4">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-linear-to-br from-white/20 to-white/0 blur-sm" />
          <div className="relative rounded-full border border-white/15 bg-white/5 p-1">
            <Image
              src={data.profile.avatar}
              alt="Your avatar"
              width={96}
              height={96}
              className="rounded-full"
              unoptimized
            />
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-white/30 mb-2">Your avatar</p>
          <button
            type="button"
            onClick={handleRandomAvatar}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95"
          >
            <span aria-hidden>🎲</span>
            Reroll avatar
          </button>
          <FormMessage error={errors?.avatar} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Field
            name="first_name"
            label="First name"
            type="text"
            placeholder="Ada"
            autoComplete="given-name"
            autoFocus
            maxLength={64}
            value={data.profile.first_name}
            onChange={handleDataChange}
          />

          <FormMessage error={errors?.first_name} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Field
            name="last_name"
            label="Last name"
            type="text"
            value={data.profile.last_name}
            onChange={handleDataChange}
            placeholder="Lovelace"
            autoComplete="family-name"
            maxLength={64}
          />
          <FormMessage error={errors?.last_name} />
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
