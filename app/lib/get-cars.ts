import { Car } from "../types/car";
import { apiFetch } from "./api";

export async function getCars(): Promise<Car[]> {
  const res = await apiFetch<Car[]>("/cars");

  if (!res.ok) throw new Error(`Failed to load cars (${res.status})`);

  return res.data ?? [];
}
