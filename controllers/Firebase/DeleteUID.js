import { admin } from "../Admin/admin-authorizer";

export default async function DeleteUID(uid, uidToDelete, userType) {
  try {
    // const firestore = admin.firestore();
    // const documentRef = firestore
    //   .collection(userType)
    //   .doc(uid)
    //   .collection("myUsers");

    // const uidsArray = await documentRef.get();
    // const uids = uidsArray.docs[0].data()["uids"];

    // if (uids != null) {
    //   const updatedUidsArray = uids.filter((uid) => uid !== uidToDelete);

    //   await documentRef.doc(uid).set({ uids: updatedUidsArray ?? [] });
    // }

    const firestore = admin.firestore();
    const documentRef = firestore
      .collection(userType)
      .doc(uid)
      .collection("myUsers")
      .doc(uid);

    const uidsArray = await documentRef.get();
    const uids = uidsArray.data()["uids"];

    if (uids != null) {
      const updatedUidsArray = uids.filter((uid) => uid !== uidToDelete);

      // Use update and FieldValue.arrayRemove to update the array
      await documentRef.update({
        uids: admin.firestore.FieldValue.arrayRemove(uidToDelete),
      });

      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}
