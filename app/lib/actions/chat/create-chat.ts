"use server";

import { redirect } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import { isUuid } from "@/app/lib/is-uuid";
import { MessageContentSchema } from "@/app/lib/validations/chat-validation";

const createChatAction = async (carId: string, message: string) => {
  if (!isUuid(carId)) return { error: "Please select a car." };

  const content = MessageContentSchema.safeParse(message);
  if (!content.success) return { error: content.error.issues[0].message };

  const res = await apiFetch<{ chat: { id: string } }>("/chats", {
    method: "POST",
    body: { chat: { car_id: carId, message: content.data } },
  });

  if (!res.ok || !res.data) {
    return { error: res.error ?? "Failed to create chat" };
  }

  redirect(`/chat/${res.data.chat.id}`);
};

export default createChatAction;
