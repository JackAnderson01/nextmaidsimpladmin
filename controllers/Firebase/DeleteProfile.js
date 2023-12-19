import { admin } from "../Admin/admin-authorizer";

export default async function DeleteProfile(uid, userType) {
  try {
    const firestore = admin.firestore();
    await firestore.collection(userType).doc(uid).delete();

    await admin.auth().deleteUser(uid);

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
