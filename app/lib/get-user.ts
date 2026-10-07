import { cache } from "react";
import { User } from "../types/user";
import { apiFetch } from "./api";

// Cached per request: the layout, page and actions all ask for the user.
export const getUser = cache(async (): Promise<User> => {
  const res = await apiFetch<User>("/current-user");

  if (!res.ok || !res.data) {
    throw new Error(`Failed to load the current user (${res.status})`);
  }

  return res.data;
});
