import type { Metadata } from "next";
import NewChatForm from "./NewChatForm";
import { getCars } from "@/app/lib/get-cars";

export const metadata: Metadata = {
  title: "New Chat | MechanicAI",
  description: "Start a new diagnostic conversation for your vehicle.",
};

const NewChat = async () => {
  const cars = await getCars();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <NewChatForm cars={cars} />
    </div>
  );
};

export default NewChat;
