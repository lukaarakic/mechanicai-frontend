import Link from "next/link";
import Button from "../components/ui/button";

const Index = () => {
  return (
    <div className="mt-30 flex h-full w-full flex-col items-center justify-center md:mt-[15vh] lg:mt-[20vh]">
      <h1 className="by-the-sea mx-auto mb-25 w-fit text-5xl font-semibold leading-tight md:text-[4rem]">
        Hi there, Luka
        <br />
        What would you like to do?
      </h1>

      <div className="mb-40 w-full md:w-auto">
        <p>No History</p>
        {/* <p className="mb-10 w-full text-left">Your History</p> */}

        {/* <HistoryList solutions={solutions} /> */}
      </div>

      <Link href={"/sessions/1"} className="w-full">
        <Button className="mx-auto py-2 w-full max-w-xl">
          Create new chat
        </Button>
      </Link>
    </div>
  );
};

export default Index;
