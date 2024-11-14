import { getAxios } from "@/services/axios";

export const getMessages=async(threadID:any)=>{
    const url = `messages?threadID=${threadID}&limit=5&offset=0`;
    return await getAxios().get(url);
}
export const createMessage=async(data:any)=>{
    const url = `messages`;
    return await getAxios().post(url,data);
}