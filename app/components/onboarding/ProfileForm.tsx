"use client";

import Field from "@/app/components/ui/Field";
import Image from "next/image";
import { randomSeed } from "@/app/utils/random-seed";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { OnboardingData, OnboardingErrorState } from "@/app/types/onboarding";
import FormMessage from "@/app/components/ui/FormMessage";

interface ProfileFormProps {
  data: OnboardingData;
  setData: Dispatch<SetStateAction<OnboardingData>>;
  errors?: OnboardingErrorState;
}

const ProfileForm = ({ data, setData, errors }: ProfileFormProps) => {
  const [avatarSeed, setAvatarSeed] = useState(() => {
    if (typeof window !== "undefined" && !data.profile.avatar)
      return randomSeed();

    return "";
  });

  const handleRandomAvatar = () => {
    const seed = randomSeed();

    setAvatarSeed(seed);
    setData((prevData) => ({
      ...prevData,
      profile: {
        ...prevData.profile,
        avatar: `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${seed}`,
      },
    }));
  };

  useEffect(() => {
    if (data.profile.avatar) return;
    setData((prevData) => ({
      ...prevData,
      profile: {
        ...prevData.profile,
        avatar: `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${avatarSeed || randomSeed()}`,
      },
    }));
  }, []);

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
              suppressHydrationWarning
              src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${avatarSeed}`}
              alt="User Avatar"
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
            <span>🎲</span>
            Reroll avatar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Field
            name="first_name"
            label="First name"
            type="text"
            placeholder="Ada"
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
          />
          <FormMessage error={errors?.last_name} />
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
