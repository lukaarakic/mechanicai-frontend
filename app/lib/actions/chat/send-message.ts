"use server";

import z from "zod";
import { getJWT } from "../../get-jwt";
import { revalidatePath } from "next/cache";
import { SendMessageState } from "@/app/types/chat";

const contentSchema = z.object({
  content: z.string().min(10, "Content must be at least 10 characters."),
});

const sendMessageAction = async (
  prevState: SendMessageState,
  formData: FormData,
) => {
  const content = formData.get("content");
  const chatId = formData.get("chatId");

  const parsedData = contentSchema.safeParse({ content });

  if (!parsedData.success) {
    return {
      data: null,
      error: {
        content:
          parsedData.error.flatten().fieldErrors.content?.[0] ||
          "Content is required",
      },
    };
  }

  const token = await getJWT();

  const res = await fetch(`${process.env.API_URL}/chats/${chatId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({
      content,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();

    return {
      data: null,
      error: {
        general:
          errorData.message || "Failed to send message. Please try again.",
      },
    };
  }

  const data = await res.json();
  revalidatePath(`/chat/${chatId}`);

  return {
    data,
    error: null,
  };
};

export default sendMessageAction;
