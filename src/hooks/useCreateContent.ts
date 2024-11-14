import { getAxios } from "@/services/axios";
export const useCreateContent = async (body: { [key: string]: any }) => {
  const url = `/cms`;
  return await getAxios().post(url, body);
};
export const useGetBlogs = async () => {
  const url = `/cms?limit=20&offset=0&type=BLOG`;
  return await getAxios().get(url);
};
export const useGetBlog = async (id: string) => {
  const url = `/cms/${id}`;
  return await getAxios().get(url);
};
