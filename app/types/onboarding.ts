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
