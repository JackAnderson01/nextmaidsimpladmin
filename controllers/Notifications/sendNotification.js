import { admin } from "../Admin/admin-authorizer.js";

export default function sendNotification(registrationToken, title, body, data) {
  const message = {
    token: registrationToken,
    notification: {
      title: title || "MaidSimpl",
      body: body || "",
    },
    data: data || {}, // Add additional data payload if provided
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
}
