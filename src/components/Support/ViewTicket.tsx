import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Plus } from "lucide-react";
import { Button } from "../ui/button";
import AlertManager from "../AlertManager";
import { Textarea } from "../ui/textarea";
import { AddComment } from "@/hooks/useTickets";
import { UserStore } from "@/pages/HomeLayout/UserStore";
import { getMessages } from "@/hooks/useMessages";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

const ViewTicket = ({
  ticket,
  setSelectedTicket,
}: {
  ticket: any;
  setSelectedTicket: Dispatch<SetStateAction<number | undefined>>;
}) => {
  const userId = UserStore((state) => state.user?.userId);
  const [comments, setComments] = useState<any[]>([
    {
      message: "Hello",
      userID: "6727b3815e0057c7eff06422",
      createdAt: "2024-11-03T17:02:59.995Z",
    },
  ]);
  const getComments = async () => {
    const messages = await getMessages(ticket.ThreadID);
    setComments([...comments, ...messages.data.data]);
  };
  const [text, setText] = useState("");
  useEffect(() => {
    if (!ticket.ThreadID) return;
    getComments();
  }, []);
  return (
    <Card className="h-[87vh]">
      <CardTitle>
        <div className=" my-4 mb-4">
          <div className="flex px-2 cursor-pointer justify-start items-start gap-2">
            <ChevronLeft
              onClick={() => {
                setSelectedTicket(undefined);
              }}
              className="h-6 w-6 mt-1 text-neutral-600"
            />
            <div className="flex flex-col w-full justify-start mb-2 items-start">
              <div className="flex w-full justify-start gap-12 items-start">
                <h2 className="text-xl font-semibold ">{ticket.Subject}</h2>
                <Button
                  variant={"none"}
                  className={`w-[150px]  ${
                    ticket.Status === "Closed"
                      ? "border-red-300 bg-red-200"
                      : ticket.Status === "Open"
                      ? "border-green-300 bg-green-200"
                      : "border-yellow-300 bg-yellow-200"
                  }  min-h-10`}
                >
                  {ticket.Status ? ticket.Status : "Pending Approval"}
                </Button>
              </div>
              <p className=" text-neutral-600 font-light text-sm">
                #{ticket.TicketID}
              </p>
            </div>
            <AlertManager
              title={
                <div className="flex flex-col justify-start gap-1 items-start">
                  <h1 className="font-semibold text-xl">Add Comment</h1>
                  <Separator />
                </div>
              }
              trigger={
                <Button
                  variant="outline"
                  className="border-primary text-primary"
                >
                  <Plus className="w-6 h-6 me-2" /> Add comment
                </Button>
              }
              confirm="Submit"
              cancel="Cancel"
              description={"Add additional comments to the ticket response"}
              body={
                <Textarea
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  className="min-h-32"
                  placeholder="Type your message here"
                />
              }
              handleConfrim={() => {
                AddComment(
                  text,
                  ticket.ThreadID,
                  userId || "",
                  ticket._id
                ).then(() => {
                  getComments();
                });
              }}
            />
          </div>
          <Separator className="mt-4" />
        </div>
      </CardTitle>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col gap-5 w-full">
            <div className="grid grid-cols-7 gap-4 col-span-full lg:col-span-3">
              <div className="flex gap-6 col-span-4">
                <p className="text-sm text-neutral-600 w-32">Creation Date </p>
                <p className="text-sm text-neutral-800 font-medium">
                  {ticket.CreatedAt?.split("-")[2].split("T")[0]}
                  {"-"}
                  {ticket.CreatedAt?.split("-")[1]}
                  {"-"}
                  {ticket.CreatedAt?.split("-")[0]}
                </p>
              </div>
              <div className="flex justify-start gap-20 col-span-2">
                <p className="text-sm text-neutral-600">Email id</p>
                <p className="text-sm text-neutral-800 font-medium">
                  {ticket.email[0].email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="flex  gap-2 col-span-6">
                <p className="text-sm text-neutral-600 min-w-32 w-32">
                  Description
                </p>
                <p className="text-sm text-neutral-800 font-medium px-4">
                  {ticket.Description}
                </p>
              </div>
            </div>
          </div>

          <Separator />
          <h1 className="text-base font-semibold">Comments</h1>
          <ScrollArea className="flex h-[40vh] px-3 flex-col gap-5">
            {comments &&
              Object.entries(
                comments.reduce((acc, comment) => {
                  const date = new Date(comment.createdAt);
                  const dateString = date.toLocaleDateString();
                  const isToday =
                    dateString === new Date().toLocaleDateString();
                  const heading = isToday ? "Today" : dateString;

                  if (!acc[heading]) {
                    acc[heading] = [];
                  }
                  acc[heading].push(comment);
                  return acc;
                }, {})
              ).map(([dateGroup, commentsForDate], index) => (
                <div key={index}>
                  <h2 className="text-center text-sm my-5">{dateGroup}</h2>
                  {(commentsForDate as any[]).map((comment: any) => (
                    <div
                      key={comment.id}
                      className={`flex px-2 text-base w-full flex-col border-b rounded-sm rounded-br-none my-2 ${
                        comment.userID === userId &&
                        "text-end justify-end items-end bg-neutral-100"
                      }`}
                    >
                      <div className="flex my-2 flex-col gap-1">
                        <p className="text-neutral-800">{comment.message}</p>
                        <p className="text-neutral-500 text-xs">
                          {comment.userID === userId ? "customer" : "admin"}{" "}
                          {new Date(comment.createdAt)
                            .toLocaleTimeString()
                            .substring(0, 5)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewTicket;
