import RatingEntity from "../../schema/feedback_rewards/RatingsSchema";
import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import { sendNotification } from "web-push";
import NotificationEntity from "../../schema/notification/NotificationSchema";
import sendNotificationsByEmail from "../Notifications/sendNotificationByEmail";

const ratingUpdateValidator = Joi.object({
  ratingId: Joi.string().min(3).required(),
  isApproved: Joi.boolean().required(),
});

export default async function ApproveRatingController(req, res) {
  const { ratingId, isApproved } = req.body;

  try {
    await ValidateTokenController(req, res, "admin");

    const { error } = await ratingUpdateValidator.validateAsync(req.body);

    if (error) {
      return res.status(400).send({ Error: error.details[0].message });
    }

    const rating = await RatingEntity.updateOne(
      { _id: ratingId },
      {
        isApproved: isApproved,
      }
    );

    if (!rating) {
      return res
        .status(404)
        .json({ success: false, message: "No such rating found" });
    }

    // const notifierDevices = await NotificationEntity({
    //   email: rating.serviceProviderEmail,
    //   isActive: true,
    // });

    // for()

    sendNotificationsByEmail(
      "MaidSimpl",
      `${rating.userName} rated you`,
      rating.serviceProviderEmail
    );

    res.status(200).json({
      success: true,
      message: "Rating approval updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
