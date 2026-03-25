"use client";

import Button from "../components/ui/button";
import createChatAction from "../lib/actions/create-chat";

const Index = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="by-the-sea mx-auto mb-25 w-fit text-5xl font-semibold leading-tight md:text-64">
        Hi there, Luka
        <br />
        What would you like to do?
      </h1>

      <div className="mb-40 w-full md:w-auto">
        <p>No History</p>
        {/* <p className="mb-10 w-full text-left">Your History</p> */}

        {/* <HistoryList solutions={solutions} /> */}
      </div>

      <Button
        className="mx-auto py-2 w-full max-w-xl"
        onClick={createChatAction}
      >
        Create new chat
      </Button>
    </div>
  );
};

export default Index;
