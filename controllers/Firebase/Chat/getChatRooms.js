import { admin } from "../../Admin/admin-authorizer";

export default async function getChatRooms(uid, userType) {
  try {
    const myUsersSnapshot = await admin
      .firestore()
      .collection(
        userType == "user" || userType == "users" ? "users" : "cleaners"
      )
      .doc(uid)
      .collection("myUsers")
      .get();

    const myUsers = myUsersSnapshot.docs[0].data().uids;

    const users = await Promise.all(
      myUsers.map(async (uid) => {
        const fetchedUser = await admin
          .firestore()
          .collection(
            userType == "cleaners" || userType == "cleaner"
              ? "users"
              : "cleaners"
          )
          .doc(uid)
          .collection("profile")
          .doc(uid)
          .get();

        return fetchedUser.data();
      })
    );

    return users == undefined || users == null || users[0] == undefined
      ? []
      : users;
  } catch (error) {
    console.log(error);
    return [];
  }
}
