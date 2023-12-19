import { admin } from "../Admin/admin-authorizer";
import ConvertImageToLink from "./ConvertImageToLink";

export default async function CreateProfile(
  uid,
  email,
  image,
  name,
  userType,
  convertImage = true
) {
  try {
    let imageLink = null;
    if (convertImage) {
      imageLink = await ConvertImageToLink(image, uid);
    } else {
      imageLink = image;
    }

    const firestore = admin.firestore();
    await firestore
      .collection(userType)
      .doc(uid)
      .collection("profile")
      .doc(uid)
      .set({
        email: email,
        image: imageLink,
        isOnline: true,
        lastActive: admin.firestore.FieldValue.serverTimestamp(),
        name: name,
        uid: uid,
      });

    await firestore
      .collection(userType)
      .doc(uid)
      .collection("myUsers")
      .doc(uid)
      .set({ uids: [] });

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
