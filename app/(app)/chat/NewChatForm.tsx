// app/chat/NewChatForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/button";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
}

const NewChatForm = ({ cars }: { cars: Car[] }) => {
  const router = useRouter();
  const [selectedCarId, setSelectedCarId] = useState(cars[0]?.id ?? "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCarId || !message.trim()) {
      setError("Please select a car and describe the problem.");
      return;
    }

    setIsPending(true);
    setError("");

    const res = await fetch("/api/v1/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ car_id: selectedCarId, message }),
    });

    if (res.ok) {
      const { id } = await res.json();
      router.push(`/chat/${id}`);
    } else {
      setError("Something went wrong. Please try again.");
      setIsPending(false);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-xs text-white/50 tracking-wide">
            New diagnostic
          </span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          What's the problem?
        </h1>
        <p className="mt-1.5 text-sm text-white/40">
          Select your vehicle and describe the issue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {cars.map((car) => (
            <button
              key={car.id}
              type="button"
              onClick={() => setSelectedCarId(car.id)}
              className={`rounded-xl border px-4 py-2 text-sm transition-all cursor-pointer ${
                selectedCarId === car.id
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-white/40 hover:border-white/20 hover:text-white/70"
              }`}
            >
              {car.make} {car.model} · {car.year}
            </button>
          ))}
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your car problem..."
          rows={4}
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none transition-colors resize-none"
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Button type="submit" disabled={isPending}>
          {isPending ? "Starting..." : "Start diagnostic →"}
        </Button>
      </form>
    </div>
  );
};

export default NewChatForm;
