export type DistanceUnit = "km" | "mi";

export type User = {
  id: string;
  // Empty until onboarding is done.
  first_name: string | null;
  last_name: string | null;
  email: string;
  avatar: string | null;
  onboarding_done: boolean;
  distance_unit: DistanceUnit;
  subscribed: boolean;
  // Diagnostics left this month on the free plan; null for Pro.
  free_chats_remaining: number | null;
};
