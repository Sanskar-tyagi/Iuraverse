import { getAxios } from "@/services/axios";
export const useUpdateCase = async ({ id, body }: { id: any, body: any }) => {
  const url = `case/${id}`;
  return await getAxios().patch(url, body);
}

