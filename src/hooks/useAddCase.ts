import { getAxios } from "@/services/axios";
export const useAddCase = async (body: { [key: string]: any }) => {
  const url = `case`;
  return await getAxios().post(url, body);
};

export const createAttachment = async (body: { [key: string]: any }) => {
  const url = `attachment`;
  return await getAxios().post(url, body);
};
