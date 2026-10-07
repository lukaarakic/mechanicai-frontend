"use client";

import Button from "@/app/components/ui/Button";
import FormMessage from "@/app/components/ui/FormMessage";
import { subscribeAction } from "@/app/lib/actions/settings/subscription/subscribe";
import { getSubscription } from "@/app/lib/actions/settings/subscription/get-subscription";
import { Environments, initializePaddle, Paddle } from "@paddle/paddle-js";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

const PADDLE_TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
const PADDLE_ENV: Environments =
  process.env.NEXT_PUBLIC_PADDLE_ENV === "production"
    ? "production"
    : "sandbox";

// Paddle confirms the purchase to our API by webhook, which can lag a few
// seconds behind the checkout closing.
const POLL_INTERVAL_MS = 2000;
const POLL_ATTEMPTS = 10;

const SubscribeButton = () => {
  const [paddle, setPaddle] = useState<Paddle>();
  const [error, setError] = useState<string | null>(
    PADDLE_TOKEN ? null : "Checkout is not available right now.",
  );
  const [activating, setActivating] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const cancelled = useRef(false);
  const paddleRef = useRef<Paddle>(undefined);

  useEffect(() => {
    cancelled.current = false;
    const token = PADDLE_TOKEN;
    if (!token) return;

    const waitForActivation = async () => {
      setActivating(true);
      for (let i = 0; i < POLL_ATTEMPTS && !cancelled.current; i++) {
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
        try {
          if ((await getSubscription()).subscribed) break;
        } catch {
          // Keep polling; the final refresh shows whatever state we have.
        }
      }
      router.refresh();
    };

    initializePaddle({
      environment: PADDLE_ENV,
      token,
      eventCallback: (event) => {
        if (event.name === "checkout.completed") {
          paddleRef.current?.Checkout.close();
          void waitForActivation();
        }
      },
    })
      .then((instance) => {
        paddleRef.current = instance;
        setPaddle(instance);
      })
      .catch(() =>
        setError("Checkout failed to load. Please refresh the page."),
      );

    return () => {
      cancelled.current = true;
    };
  }, [router]);

  const handleClick = () => {
    setError(null);
    startTransition(async () => {
      if (!paddle) {
        setError("Checkout is still loading. Please try again.");
        return;
      }

      const result = await subscribeAction();
      if (result.error !== null) {
        setError(result.error);
        return;
      }

      paddle.Checkout.open({
        customer: { id: result.customerId },
        items: [
          { priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID!, quantity: 1 },
        ],
      });
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={handleClick}
        disabled={!paddle || isPending || activating}
        className="w-full"
      >
        {activating
          ? "Activating your plan..."
          : isPending
            ? "Opening checkout..."
            : "Upgrade to Pro →"}
      </Button>
      <FormMessage error={error} />
    </div>
  );
};

export default SubscribeButton;
