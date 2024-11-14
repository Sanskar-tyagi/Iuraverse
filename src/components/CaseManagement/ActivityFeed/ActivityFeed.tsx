import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Plus } from "lucide-react";
import SideCard from "./SideCard";
import Threads from "./Threads";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getThreads, useCreateThread } from "@/hooks/useThreads";
import { createMessage, getMessages } from "@/hooks/useMessages";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCurrentUser } from "aws-amplify/auth";
import { checkUser } from "@/hooks/useAddUser";
import { useEffect, useState } from "react";

export const ActivityFeed = () => {
  const [searchParams] = useSearchParams();
  const caseID = searchParams.get("id");
  const userID = async () => {
    const { userId } = await getCurrentUser();
    const user = await checkUser(userId);
    return user.data.id;
  };
  const [chat, setChat] = useState<string>("");
  const [userThreads, setThreads] = useState<any[]>([]);
  const [selectedThread, setSelectedThread] = useState(0);
  const data = async () => {
    const Threads = await getThreads(caseID);
    const threadWithMessages = await Promise.all(
      Threads.data.data.map(async (thread: any) => {
        const messages = await getMessages(thread._id);
        return {
          thread,
          messages: messages.data.data,
        };
      })
    );
    return threadWithMessages;
  };
  const getThreadsData = async () => {
    const threadsWithMessages = await data();
    setThreads(threadsWithMessages);
  };
  useEffect(() => {
    getThreadsData();
  }, []);
  const nav = useNavigate();
  return (
    <>
      {userThreads ? (
        <Card className="rounded-sm">
          <CardTitle>
            <div className=" my-4 mb-4">
              <div
                onClick={() => {
                  nav("/case-and-service-management");
                }}
                className="flex px-2 cursor-pointer justify-start items-center gap-2"
              >
                <ChevronLeft className="h-6 w-6 text-neutral-600" />
                <h2 className="text-xl font-semibold ">Activity Feed</h2>
              </div>
              <Separator className="mt-4" />
            </div>
          </CardTitle>
          <CardContent className="bg-[#F1F1F1] p-0 h-[73vh]">
            <div className="flex gap-3 justify-between h-[73vh]">
              <div className="flex flex-col h-[73vh] w-[34%]  bg-white">
                <div className="flex flex-col gap-3 h-full">
                  {userThreads &&
                    userThreads.map((_item: any, idx: number) => {
                      return (
                        <div
                          onClick={() => {
                            setSelectedThread(idx);
                          }}
                        >
                          <SideCard
                            userName="AK"
                            Heading="Send over identity proofs"
                            total="10"
                            isSelected={selectedThread === idx}
                          />
                        </div>
                      );
                    })}
                </div>
                <div className="p-4 border">
                  <Button
                    onClick={() => {
                      useCreateThread(userID, caseID).then(() => {
                        getThreadsData();
                      });
                    }}
                    className="text-primary flex justify-center items-center w-full bg-white hover:bg-black/20"
                  >
                    <Plus className="h-6 w-6 text-primary" />
                    Add a new comment
                  </Button>
                </div>
              </div>
              <div className="flex flex-col h-[73vh] w-[65%]  bg-white">
                <CardTitle>
                  <div className=" my-4 mb-4">
                    <div
                      onClick={() => {}}
                      className="flex px-2 cursor-pointer justify-start items-center gap-2"
                    >
                      <ChevronLeft className="h-6 w-6 text-neutral-600" />
                      <h2 className="text-sm font-medium ">
                        {userThreads[selectedThread]?.messages?.length} messages
                      </h2>
                    </div>
                    <Separator className="mt-4" />
                  </div>
                </CardTitle>
                <div className="flex flex-col h-[85%] justify-between">
                  <ScrollArea className="h-[100%] p-2">
                    {userThreads[selectedThread]?.messages?.map(
                      (message: any, idx: number) => {
                        return (
                          <Threads
                            Heading={"Lawyer"}
                            chat={message}
                            isLast={
                              userThreads[selectedThread].messages.length ===
                              idx + 1
                            }
                            userName="AK"
                          />
                        );
                      }
                    )}
                  </ScrollArea>
                  <div className="flex w-full border p-4">
                    <Input
                      value={chat}
                      onChange={(e) => {
                        setChat(e.target.value);
                      }}
                      placeholder="Your comment here.."
                    />
                    <Button
                      onClick={() => {
                        createMessage({
                          threadID: userThreads[selectedThread].thread._id,
                          message: chat,
                          userID: userID,
                          caseID: caseID,
                          createdAt: new Date().toISOString(),
                        }).then(() => {
                          getThreadsData();
                          setChat(" ");
                        });
                      }}
                      className="bg-primary text-white"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
