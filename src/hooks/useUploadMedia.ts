import { getAxios } from "@/services/axios";
import axios from "axios";

export const useUploadImage = async (image: any) => {
  if (!image) return;
  const data = await getPreSignedUrl(image);
  const url = data.data.url;
  const fields = (data.data as { fields: Record<string, string> }).fields;
  const formData = new FormData();
  Object.entries({ ...fields, file: image }).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });
  await axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return getAxios().post("/attachments", {
    attachment: image.name,
  });
};

const getPreSignedUrl = (file: any) => {
  return getAxios().post("storage-accounts/BeingVakil/upload", {
    name: file.name,
    size: file.size,
  });
};

export const DownloadFile = (file: any) => {
  return getAxios().get(`/storage-accounts/BeingVakil/download?name=${file}`);
};

export const getAttachment = async (id: string) => {
  const getFile = await getAxios().get(`attachments/${id}`);
  return DownloadFile(getFile.data.attachment);
};
