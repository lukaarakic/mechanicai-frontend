import { Car } from "./car";

export type ProfileData = {
  first_name: string;
  last_name: string;
  avatar: string;
};

export type OnboardingData = {
  profile: ProfileData;
  car: Car;
};

type OnboardingFields =
  | "first_name"
  | "last_name"
  | "make"
  | "model"
  | "year"
  | "size"
  | "power";

export type OnboardingErrorState = Partial<Record<OnboardingFields, string>> & {
  general?: string;
};
