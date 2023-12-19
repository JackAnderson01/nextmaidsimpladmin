import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import NotificationEntity from "../../schema/notification/NotificationSchema";
import sendNotification from "./sendNotification";
import saveNotificationContent from "./saveNotificationContent";

const validator = Joi.object({
  message: Joi.string().required(),
  title: Joi.string().required(),
  audience: Joi.string().valid("cleaner", "user", "all").required(),
});

export default async function PostNotificationsByAudienceController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { title, message, audience } = req.body;

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    //Code block for sending notifications to everyone in database
    if (audience == "all") {
      const existingUserAudience = await NotificationEntity.find({
        userType: "user",
        isActive: true,
      });

      const existingCleanerAudience = await NotificationEntity.find({
        userType: "cleaner",
        isActive: true,
      });

      if (existingUserAudience && existingUserAudience.length > 0) {
        existingUserAudience.forEach(async (device) => {
          await saveNotificationContent(device.email, title, message);

          sendNotification(device.registrationToken, title, message);
        });
      }

      if (existingCleanerAudience && existingCleanerAudience.length > 0) {
        existingCleanerAudience.forEach(async (device) => {
          await saveNotificationContent(device.email, title, message);

          sendNotification(device.registrationToken, title, message);
        });
      }

      return res
        .status(200)
        .send({ success: true, result: "Notifications Sent" });
    }

    const existingAudience = await NotificationEntity.find({
      userType: audience,
      isActive: true,
    });

    if (existingAudience && existingAudience.length > 0) {
      existingAudience.forEach(async (device) => {
        await saveNotificationContent(device.email, title, message);

        sendNotification(device.registrationToken, title, message);
      });

      return res
        .status(200)
        .send({ success: true, result: "Notification Sent" });
    } else {
      return res
        .status(404)
        .send({ success: false, error: "No active devices found" });
    }
  } catch (err) {
    console.error("Error sending notification:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
