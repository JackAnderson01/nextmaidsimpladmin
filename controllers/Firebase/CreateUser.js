import { admin } from "../Admin/admin-authorizer";

function generateCustomUid() {
  const allowedChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  const uidLength = 28;

  let customUid = "";
  for (let i = 0; i < uidLength; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    customUid += allowedChars.charAt(randomIndex);
  }

  return customUid;
}

export default async function CreateUser(email, password) {
  try {
    const user = await admin.auth().createUser({
      uid: generateCustomUid(),
      email: email,
      password: password,
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}
