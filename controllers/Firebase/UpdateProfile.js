import { admin } from "../Admin/admin-authorizer";
import ConvertImageToLink from "./ConvertImageToLink";

export default async function UpdateProfile(
  uid,
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

    // Update the existing profile document
    await firestore
      .collection(userType)
      .doc(uid)
      .collection("profile")
      .doc(uid)
      .update({
        image: imageLink,
        lastActive: admin.firestore.FieldValue.serverTimestamp(),
        name: name,
      });

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
