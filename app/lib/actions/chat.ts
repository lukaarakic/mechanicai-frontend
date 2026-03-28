"use server";

import z from "zod";

const contentSchema = z.object({
  content: z.string().min(50, "Content is required"),
});

const sendMessageAction = async (
  prevState: { data: any; error: any },
  formData: FormData,
) => {
  const content = formData.get("content");
  const sessionId = formData.get("sessionId");

  const validatedData = contentSchema.safeParse({ content });

  if (!validatedData.success) {
    return {
      data: null,
      error: z.prettifyError(validatedData.error),
    };
  }

  const res = await fetch(
    `${process.env.API_URL}/api/v1/sessions/${sessionId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    },
  );

  if (!res.ok) {
    return {
      data: null,
      error: `API error: ${res.status} ${res.statusText}`,
    };
  }

  const data = await res.json();

  return {
    data,
    error: null,
  };
};

export default sendMessageAction;
