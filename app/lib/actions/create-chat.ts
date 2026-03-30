"use server";

import { redirect } from "next/navigation";
import { getJWT } from "../get-jwt";

const createChatAction = async (carId: string, message: string) => {
  const token = await getJWT();

  const res = await fetch(`${process.env.API_URL}/chats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({ chat: { car_id: carId, message } }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return { error: errorData["error"] ?? "Failed to create chat" };
  }

  const data = await res.json();

  redirect(`/chat/${data.chat.id}`);
};

export default createChatAction;
