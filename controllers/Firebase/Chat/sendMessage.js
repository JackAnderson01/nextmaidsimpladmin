import { admin } from "../../Admin/admin-authorizer";
import uploadImage from "./uploadImage";

export async function createImageMessage(receiverId, myUID, file, userType) {
  const sentTime = admin.firestore.Timestamp.fromDate(Date.now());
  // const sentTime = admin.firestore.Timestamp.now();
  const image = await uploadImage(
    file,
    `image/chat/${myUID}/${receiverId}/${sentTime}`
  );

  const message = {
    content: image,
    sentTime: sentTime,
    receiverId: receiverId,
    messageType: "image",
    senderId: myUID,
  };

  return await _sendMessage(receiverId, myUID, message, userType);
}

export async function createTextMessage(receiverId, myUID, text, userType) {
  // const sentTime = admin.firestore.Timestamp.now();
  const message = {
    content: text,
    sentTime: /*sentTime,*/ admin.firestore.Timestamp.fromDate(Date.now()),
    receiverId: receiverId,
    messageType: "text",
    senderId: myUID,
  };

  return await _sendMessage(receiverId, myUID, message, userType);
}

async function _sendMessage(receiverId, myUID, message, userType) {
  try {
    await admin
      .firestore()
      .collection(
        userType == "user" || userType == "users" ? "users" : "cleaners"
      )
      .doc(myUID)
      .collection(receiverId)
      .add(message);

    await admin
      .firestore()
      .collection(
        userType == "cleaner" || userType == "cleaners" ? "users" : "cleaners"
      )
      .doc(receiverId)
      .collection(myUID)
      .add(message);

    return true;
  } catch (error) {
    // Handle the error as needed
    console.error("Error adding message to chat:", error);
    return false;
  }
}
