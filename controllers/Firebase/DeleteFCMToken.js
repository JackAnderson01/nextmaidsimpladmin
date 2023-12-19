import { admin } from "../Admin/admin-authorizer";

export default async function DeleteFCMToken(uid, userType) {
  try {
    const firestore = admin.firestore();
    await firestore
      .collection(userType)
      .doc(uid)
      .collection("notification")
      .doc(uid)
      .delete();

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
