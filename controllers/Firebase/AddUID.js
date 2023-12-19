import { admin } from "../Admin/admin-authorizer";

export default async function AddUID(cleanerUID, userUID) {
  try {
    const firestore = admin.firestore();

    // Update cleaner document
    const cleanerDocRef = firestore
      .collection("cleaners")
      .doc(cleanerUID)
      .collection("myUsers")
      .doc(cleanerUID);

    const cleanerDoc = await cleanerDocRef.get();

    if (cleanerDoc.exists) {
      let updatedCleanerUids = [];
      if (cleanerDoc.data()?.uids) {
        updatedCleanerUids = [...cleanerDoc.data().uids, userUID];
      } else {
        updatedCleanerUids = [userUID];
      }

      await cleanerDocRef.update({ uids: updatedCleanerUids });
    }

    // Update user document
    const userDocRef = firestore
      .collection("users")
      .doc(userUID)
      .collection("myUsers")
      .doc(userUID);
    const userDoc = await userDocRef.get();

    if (userDoc.exists) {
      let updatedUserUids = [];
      if (userDoc.data()?.uids) {
        updatedUserUids = [...userDoc.data().uids, cleanerUID];
      } else {
        updatedUserUids = [cleanerUID];
      }

      await userDocRef.update({ uids: updatedUserUids });
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
