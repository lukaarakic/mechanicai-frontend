"use server";

import z from "zod";
import { getJWT } from "../getJWT";
import { revalidatePath } from "next/cache";

const contentSchema = z.object({
  content: z.string().min(10, "Content is required"),
});

const sendMessageAction = async (
  prevState: { data: any; error: any },
  formData: FormData,
) => {
  const content = formData.get("content");
  const chatId = formData.get("chatId");

  const validatedData = contentSchema.safeParse({ content });

  if (!validatedData.success) {
    return {
      data: null,
      error: z.prettifyError(validatedData.error),
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
    return {
      data: null,
      error: `API error: ${res.status} ${res.statusText}`,
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
