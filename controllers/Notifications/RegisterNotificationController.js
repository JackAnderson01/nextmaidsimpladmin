import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import NotificationEntity from "../../schema/notification/NotificationSchema";
import sendNotification from "./sendNotification";
import saveNotificationContent from "./saveNotificationContent";

const validator = Joi.object({
  email: Joi.string().email().required(),
  registrationToken: Joi.string().required(),
  userType: Joi.string().valid("cleaner", "user").required(),
});

export default async function RegisterNotificationController(req, res) {
  try {
    await ValidateTokenController(
      req,
      res,
      "admin",
      "cleaner",
      "user",
      "temp-cleaner"
    );

    const { email, registrationToken, userType } = req.body;
    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const existingToken = await NotificationEntity.findOne({
      email: email,
      registrationToken: registrationToken,
    });

    if (existingToken) {
      return res
        .status(200)
        .send({ success: true, result: "Already Registered!" });
    } else {
      const newRecord = new NotificationEntity({
        email: email,
        registrationToken: registrationToken,
        userType: userType,
        isActive: true,
      });

      await newRecord.save();

      await saveNotificationContent(email, "MaidSimpl", "Welcome to MaidSimpl");
      sendNotification(registrationToken, "MaidSimpl", "Welcome to MaidSimpl");

      return res.status(201).send({ success: true });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
}
