"use client";

import Button from "@/app/components/ui/Button";
import { subscribeAction } from "@/app/lib/actions/settings/subscription/subscribe";
import { initializePaddle } from "@paddle/paddle-js";
import { useTransition } from "react";

const SubscribeButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      const { customer_id } = await subscribeAction();

      const paddle = await initializePaddle({
        environment: "sandbox",
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
      });

      paddle?.Checkout.open({
        customer: { id: customer_id },
        items: [
          {
            priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID!,
            quantity: 1,
          },
        ],
      });
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending} className="w-full ">
      {isPending ? "Loading..." : "Upgrade to Pro →"}
    </Button>
  );
};

export default SubscribeButton;
