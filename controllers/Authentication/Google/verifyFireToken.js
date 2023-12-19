import FireUserEntity from "../../../schema/firebase/FireUserSchema";

export default async function verifyFireToken(uid, email, role) {
  try {
    // The UID of the authenticated user
    const fireUser = await FireUserEntity.findOne({
      email: email,
      role: role,
      uid: uid,
    });

    if (fireUser === null) {
      return false;
    } else if (uid === fireUser.uid) {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}
