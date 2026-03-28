"use server";

import { redirect } from "next/navigation";

const createChatAction = async () => {
  const res = await fetch(`${process.env.API_URL}/api/v1/sessions`, {
    method: "POST",
    body: JSON.stringify({
      session: {
        car_make: "Toyota",
        car_model: "Camry",
        car_year: 2010,
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  redirect(`/sessions/${data.uuid}`);
};

export default createChatAction;
