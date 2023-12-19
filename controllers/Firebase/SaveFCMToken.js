import { admin } from "../Admin/admin-authorizer";

export default async function SaveFCMToken(uid, fcmToken, userType) {
  try {
    const firestore = admin.firestore();
    await firestore
      .collection(userType)
      .doc(uid)
      .collection("notification")
      .doc(uid)
      .add({
        token: fcmToken,
      });

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
