export type CarData = {
  make: string;
  model: string;
  year: number | "";
  size: number | "";
  power: number | "";
};

export type ProfileData = {
  first_name: string;
  last_name: string;
  avatar: string;
};

export type OnboardingData = {
  profile: ProfileData;
  car: CarData;
};
