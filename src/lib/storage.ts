import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

export type UploadProgressCallback = (progress: number) => void;

/** Upload an image to Firebase Storage */
export async function uploadImage(
  file: File,
  path: string,
  onProgress?: UploadProgressCallback
): Promise<string | null> {
  try {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress?.(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          reject(null);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}

/** Delete an image from Firebase Storage */
export async function deleteImage(path: string): Promise<boolean> {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
}

/** Get download URL for an image */
export async function getImageUrl(path: string): Promise<string | null> {
  try {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
  } catch {
    return null;
  }
}