import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";
import sendEmail from "./sendEmail";
import sendNotificationsByEmail from "../Notifications/sendNotificationByEmail";

const adminValidator = Joi.object({
  serviceProviderEmail: Joi.string().email().required(),
  isApproved: Joi.boolean().required(),
});

export default async function ApproveServiceProviderController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { serviceProviderEmail, isApproved } = req.body;
    const { error } = adminValidator.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existingServiceProvider = await ServiceProviderEntity.findOne({
      email: serviceProviderEmail,
    });

    if (existingServiceProvider) {
      const updatedServiceProvider =
        await ServiceProviderEntity.findOneAndUpdate(
          { email: serviceProviderEmail },
          {
            isApproved: isApproved,
          },
          { new: true }
        );

      if (!updatedServiceProvider) {
        return res
          .status(404)
          .json({ success: false, error: "Service Provider not found" });
      }

      const isSent = await sendEmail(
        "Congratulations on Your Approved MaidSimpl Profile! - MaidSimpl",
        `<p>Dear ${existingServiceProvider.preferredName},</p>
        <br/>
        <p>We are thrilled to inform you that your profile has been successfully approved by MaidSimpl. Congratulations on this achievement! We look forward to the valuable contributions you'll bring to our community.</p>
        <br/>
        Click <a href="http://portal.maidsimpl.com/login">here</a> to login to profile.
        <br/>
        <br/>
        <p>Best regards,<br>Team MaidSimpl</p>`,
        existingServiceProvider.email
      );

      // if (isSent) {

      sendNotificationsByEmail(
        "MaidSimpl",
        "Congrats -  Your profile has been approved!",
        existingServiceProvider.email
      );

      return res
        .status(200)
        .json({ success: true, result: updatedServiceProvider });
      // } else {
      //   return res.status(200).json({
      //     success: true,
      //     result: updatedServiceProvider,
      //     error: "Email not sent, but cleaner approved",
      //   });
      // }
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Service Provider not updated" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
