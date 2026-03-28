import NewChatForm from "./NewChatForm";
import { getJWT } from "@/app/lib/getJWT";

async function getCars() {
  const token = await getJWT();

  const res = await fetch(`${process.env.API_URL}/cars`, {
    headers: { Authorization: `${token}` },
  });

  return res.ok ? await res.json() : [];
}

const NewChat = async () => {
  const cars = await getCars();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <NewChatForm cars={cars} />
    </div>
  );
};

export default NewChat;
