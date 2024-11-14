import { getAxios } from "@/services/axios"; 

export  const useRemoveMedia = async (image: any) => {
    if (!image) return;
    const url = "storage-accounts/BeingVakil/delete";
    return getAxios().delete(url, {
        data: {
            objectsToDelete: [image]
        }
    })

}


