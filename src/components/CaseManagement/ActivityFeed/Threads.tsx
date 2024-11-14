import { ArrowDownToLine } from "lucide-react";

interface IThreads {
  userName: string;
  Heading: string;
  chat: any;
  hasDoc?: boolean;
  isLast?: boolean;
}
const Threads = ({ userName, Heading, chat, hasDoc, isLast }: IThreads) => {
  const time = new Date(chat.createdAt).toLocaleTimeString();
  return (
    <div className="p-4 pt-0 flex justify-start gap-4">
      <div className="flex flex-col gap-1 justify-start items-center">
        <div className="flex  items-center justify-center text-base bg-[#F7D3FF] text-black h-11 w-11 rounded-full">
          {userName}
        </div>
        {!isLast && (
          <div className="flex flex-col gap-1 ">
            <hr className="h-3 w-[2px] bg-neutral-300" />
            <hr className="h-3 w-[2px] bg-neutral-300" />
            <hr className="h-3 w-[2px] bg-neutral-300" />
            <hr className="h-3 w-[2px] bg-neutral-300" />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full gap-4">
        <div className="flex text-base w-full flex-col">
          <div className="flex justify-between items-center ">
            {" "}
            <p className="text-neutral-800 "> {Heading}</p>
            <p className="text-sm text-neutral-400">{time.substring(0, 5)}</p>
          </div>
          <p className="text-sm text-neutral-600 mt-2">{chat.message}</p>
        </div>
        {hasDoc && (
          <div className="grid grid-cols-2 items-center gap-5">
            <div className="col-span-1 flex justify-between items-start w-full text-sm px-5 py-2 bg-neutral-100 shadow-sm">
              Legaladvise.pdf | 4.2 MB{" "}
              <ArrowDownToLine className="h-4 w-4 text-neutral-500" />
            </div>
            <div className="col-span-1 flex justify-between items-start w-full text-sm px-5 py-2 bg-neutral-100 shadow-sm">
              Legaladvise.pdf | 4.2 MB{" "}
              <ArrowDownToLine className="h-4 w-4 text-neutral-500" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Threads;
