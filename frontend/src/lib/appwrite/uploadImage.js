import { ID, ImageGravity } from "appwrite"
import { appwriteConfig, storage } from "./config"

// Upload File
export async function uploadFile(file) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        )

        return uploadedFile
    } catch (error) {
        console.log(error)
    }
}

// Get File Url
// export function getFilePreview(fileId) {
//     try {
//         const fileUrl = storage.getFilePreview(
//             appwriteConfig.storageId,
//             fileId,
//             2000,
//             2000,
//             ImageGravity.Top,
//             100
//         )

//         if (!fileUrl) throw Error

//         return fileUrl
//     } catch (error) {
//         console.log(error)
//     }
// }
export function getFileView(fileId) {
    try {
        const fileUrl = storage.getFileView(
            appwriteConfig.storageId,
            fileId
        );

        if (!fileUrl) throw new Error("Failed to generate file view URL");

        return fileUrl;
    } catch (error) {
        console.log(error);
    }
}
