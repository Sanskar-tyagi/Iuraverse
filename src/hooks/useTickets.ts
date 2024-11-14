import { getAxios } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";
import { createMessage } from "./useMessages";
import { useCreateThread } from "./useThreads";

export const useGetTickets = (id?: string) => {
  const url = `/tickets${id ? `?CreatedBy=${id}&` : "?"}limit=20&offset=0`;
  return useQuery({
    queryKey: ["useGetTickets", id],
    queryFn: async () => {
      const { data } = await getAxios().get(url);
      return data;
    },
  });
};

export const CreateTicket = (data: any) => {
  return getAxios().post("/tickets", data);
};

export const UpdateTicket = (id: string, data: any) => {
  return getAxios().patch(`/tickets/${id}`, data);
};

export const AddComment = async (
  Message: string,
  ThreadID: string,
  createdBy: string,
  ticketId: string
) => {
  if (ThreadID) {
    return createMessage({
      threadID: ThreadID,
      message: Message,
      userID: createdBy,
      createdAt: new Date().toISOString(),
    });
  } else {
    try {
      const threadResponse = await useCreateThread(createdBy);
      const threadID = threadResponse.data.id;
      await UpdateTicket(ticketId, { ThreadID: threadID });
      await createMessage({
        threadID: threadID,
        message: Message,
        userID: createdBy,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
};
