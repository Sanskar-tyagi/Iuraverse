import { getAxios } from "@/services/axios";
export const useCreateThread = async (startedBy: any, caseID?: any) => {
  const url = `threads`;
  return await getAxios().post(url, {
    caseID,
    createdAt: Date.now(),
    startedBy,
  });
};
export const getThreads = async (caseID: any) => {
  const url = `threads?caseID=${caseID}&limit=20&offset=0`;
  return await getAxios().get(url);
};
export const getThread = async (id: any) => {
  const url = `thread/${id}`;
  return await getAxios().get(url);
};
