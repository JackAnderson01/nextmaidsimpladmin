import NotificationContentEntity from "../../schema/notification/NotificationContentSchema";
import getNotificationTime from "./getNotificationTime";

export default async function saveNotificationContent(email, title, message) {
  try {
    const newNotificationContent = new NotificationContentEntity({
      email: email,
      title: title,
      message: message,
      time: getNotificationTime(),
    });

    await newNotificationContent.save();

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
