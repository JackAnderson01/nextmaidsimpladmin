import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import UserBlockEntity from "../../schema/admin/UserBlockSchema";
import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";
import WalletEntity from "../../schema/finance/WalletSchema";
import sendNotificationsByEmail from "../Notifications/sendNotificationByEmail";

const validator = Joi.object({
  email: Joi.string().email().required(),
  isDeleted: Joi.bool().required(),
});

export default async function DeleteUserController(req, res) {
  const { email, isDeleted } = req.body;

  try {
    await ValidateTokenController(req, res, "admin");

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const blockedUser = await UserBlockEntity.findOne({
      email: email,
    });

    if (blockedUser == null) {
      return res.status(404).json({
        success: false,
        error: "No such user / cleaner found",
      });
    } else {
      const wallet = await WalletEntity.findOne({ email: email });

      if (wallet != null && wallet.balance > 0) {
        return res.status(400).json({
          success: false,
          error: "Can't delete if cleaner has money in wallet",
        });
      }

      const updatedBlock = await UserBlockEntity.findOneAndUpdate(
        {
          email: email,
        },
        {
          isDeleted: isDeleted,
        }
      );

      if (isDeleted == true) {
        sendNotificationsByEmail(
          "MaidSimpl",
          "Your account has been terminated by admin",
          email
        );
      } else {
        sendNotificationsByEmail(
          "MaidSimpl",
          "Your account has been restored by admin",
          email
        );
      }

      return res.status(200).json({
        success: true,
        result: updatedBlock,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
}
