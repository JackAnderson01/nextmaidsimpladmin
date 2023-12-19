import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import NotificationEntity from "../../schema/notification/NotificationSchema";

const validator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GetNotificationPreferenceController(req, res) {
  try {
    await ValidateTokenController(req, res, "cleaner", "user");

    const { email } = req.body;

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }

    const existingToken = await NotificationEntity.findOne(
      { email: email },
      { isActive: 1, _id: 1 }
    );

    if (existingToken) {
      return res.status(200).json({ success: true, result: existingToken });
    } else {
      return res.status(404).json({
        success: false,
        error: "No records found, please register device token",
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
}
