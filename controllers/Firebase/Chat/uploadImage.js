import { admin } from "../../Admin/admin-authorizer";

export default async function uploadImage(file, storagePath) {
  try {
    const storageRef = admin.storage().ref();
    const fileRef = storageRef.child(storagePath);

    const snapshot = await fileRef.put(file);
    const downloadURL = await snapshot.ref.getDownloadURL();

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}
