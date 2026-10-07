"use server";

import { revalidatePath } from "next/cache";
import { apiFetch } from "@/app/lib/api";
import { isUuid } from "@/app/lib/is-uuid";
import { MessageContentSchema } from "@/app/lib/validations/chat-validation";
import { SendMessageState } from "@/app/types/chat";

const sendMessageAction = async (
  chatId: string,
  content: string,
): Promise<SendMessageState> => {
  if (!isUuid(chatId)) return { error: { general: "Chat not found." } };

  const parsed = MessageContentSchema.safeParse(content);
  if (!parsed.success) {
    return { error: { content: parsed.error.issues[0].message } };
  }

  const res = await apiFetch(`/chats/${chatId}/messages`, {
    method: "POST",
    body: { content: parsed.data },
  });

  if (!res.ok) {
    return {
      error: {
        general: res.error ?? "Failed to send message. Please try again.",
      },
      limitReached: res.status === 403,
    };
  }

  revalidatePath(`/chat/${chatId}`);
  return { error: null };
};

export default sendMessageAction;
