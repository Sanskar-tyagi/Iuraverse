import { getAxios } from "@/services/axios";
export const useAddUser = async (body: { [key: string]: any; }) => {
    const url = `users`;
    return await getAxios().post(url, body);
}

export const checkUser = async (id: any) => {
    const url = `cognitoID/${id}`;
    return await getAxios().get(url);
}

export const getUser = async (id: any) => {
    const url = `users/${id}`;
    return await getAxios().get(url);
}
export const updateUser = async (id: any, body: { [key: string]: any; }) => {
    const url = `users/${id}`;
    return await getAxios().patch(url, body);
}