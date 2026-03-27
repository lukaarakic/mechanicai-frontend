import CreateChatButton from "../components/CreateChatButton";

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

      <CreateChatButton />
    </div>
  );
};

export default Index;
