import Joi from "@hapi/joi";
import NotificationEntity from "../../schema/notification/NotificationSchema";
import sendNotification from "./sendNotification";
import saveNotificationContent from "./saveNotificationContent";

const validator = Joi.object({
  message: Joi.string().required(),
  title: Joi.string().required(),
  email: Joi.string().email().required(),
});

export default async function sendNotificationsByEmail(title, message, email) {
  try {
    const { error } = await validator.validateAsync({ title, message, email });

    if (error) {
      return false;
    }

    const existingAudience = await NotificationEntity.find({
      email: email,
      isActive: true,
    });

    if (!existingAudience || existingAudience.length === 0) {
      return false;
    }

    existingAudience.forEach(async (device) => {
      await saveNotificationContent(device.email, title, message);

      sendNotification(device.registrationToken, title, message);
    });

    return true;
  } catch (err) {
    console.error("Error sending notification:", err);
    return false;
  }
}
