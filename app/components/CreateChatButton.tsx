"use client";

import Button from "./ui/Button";
import createChatAction from "../lib/actions/create-chat";

const CreateChatButton = () => {
  return (
    <Button className="mx-auto py-2 w-full max-w-xl" onClick={createChatAction}>
      Create new chat
    </Button>
  );
};

export default CreateChatButton;
