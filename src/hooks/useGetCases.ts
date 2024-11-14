import { getAxios } from "@/services/axios";
import { useQuery } from "@/services/query";

export const useGetCases = (id?: string) => {
  const url = `case?limit=20&offset=0${id ? `&CreatedBy=${id}` : ""}`;
  return useQuery({
    queryKey: ["useGetCases", id],
    queryFn: async () => {
      const { data } = await getAxios().get(url);
      return data;
    },
  });
};
