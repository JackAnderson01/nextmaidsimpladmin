import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import NotificationEntity from "../../schema/notification/NotificationSchema";
import sendNotification from "./sendNotification";
import saveNotificationContent from "./saveNotificationContent";

const validator = Joi.object({
  message: Joi.string().required(),
  title: Joi.string().required(),
  token: Joi.string().min(5).required(),
  senderId: Joi.string().min(5).required(),
});

export default async function PostNotificationByDeviceController(req, res) {
  try {
    await ValidateTokenController(req, res, "user", "cleaner");

    const { title, message, token, senderId } = req.body;

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const deviceExists = await NotificationEntity.find({
      registrationToken: token,
      isActive: true,
    });

    await saveNotificationContent(deviceExists.email, title, message);

    if (deviceExists != null) {
      sendNotification(
        token,
        title,
        message,

        {
          click_action: "FLUTTER_NOTIFICATION_CLICK",
          status: "done",
          senderId: senderId,
        }
      );
    }
    return res.status(200).send({ success: true, result: "Notification Sent" });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}
