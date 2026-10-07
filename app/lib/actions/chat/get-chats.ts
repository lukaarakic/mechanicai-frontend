"use server";

import { apiFetch } from "@/app/lib/api";
import { ChatSummary, HISTORY_PAGE_SIZE } from "@/app/types/history";

// Pro-only on the API. `before` is the created_at of the last loaded chat.
export async function getChats({
  limit = HISTORY_PAGE_SIZE,
  before,
}: { limit?: number; before?: string } = {}): Promise<ChatSummary[]> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (before) params.set("before", before);

  const res = await apiFetch<ChatSummary[]>(`/chats?${params}`);
  if (!res.ok) throw new Error(`Failed to load history (${res.status})`);

  return res.data ?? [];
}
