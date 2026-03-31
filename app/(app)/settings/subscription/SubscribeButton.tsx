"use client";

import Button from "@/app/components/ui/Button";
import { subscribeAction } from "@/app/lib/actions/settings/subscription/subscribe";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const SubscribeButton = () => {
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    initializePaddle({
      environment: "sandbox",
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
      eventCallback: function (data) {
        if (data.name == "checkout.completed") {
          setTimeout(() => {
            router.refresh();
          }, 2000);
        }
      },
    }).then(setPaddle);
  }, []);

  const handleClick = async () => {
    startTransition(async () => {
      const { customer_id } = await subscribeAction();

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
