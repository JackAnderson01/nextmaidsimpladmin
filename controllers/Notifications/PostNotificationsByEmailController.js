import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import NotificationEntity from "../../schema/notification/NotificationSchema";
import sendNotification from "./sendNotification";
import saveNotificationContent from "./saveNotificationContent";

const validator = Joi.object({
  message: Joi.string().required(),
  title: Joi.string().required(),
  email: Joi.string().email().required(),
});

export default async function PostNotificationsByEmailController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin", "user", "cleaner");

    const { title, message, email } = req.body;

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const existingAudience = await NotificationEntity.find({
      email: email,
      isActive: true,
    });

    if (!existingAudience || existingAudience.length === 0) {
      return res.status(404).send({
        success: false,
        error: "No active devices found for the provided email",
      });
    }

    existingAudience.forEach(async (device) => {
      await saveNotificationContent(device.email, title, message);

      sendNotification(device.registrationToken, title, message);
    });

    return res.status(200).send({ success: true, result: "Notification Sent" });
  } catch (err) {
    console.error("Error sending notification:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
