import Joi from "@hapi/joi";
import VoucherEntity from "../../schema/feedback_rewards/VoucherSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import ReferCodeEntity from "../../schema/feedback_rewards/ReferCodeSchema";

const emailValidator = Joi.object({
  userEmail: Joi.string().email().required(),
});

export default async function GetRewardStatusController(req, res) {
  const { userEmail } = req.body;

  try {
    await ValidateTokenController(req, res, "user");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ Error: error.details[0].message });
    } else {
      const referRecord = await ReferCodeEntity.findOne({ email: userEmail });
      const vouchers = await VoucherEntity.find({ email: userEmail });

      if (!referRecord) {
        res.status(200).json({ success: false, result: null });
      } else {
        res.status(200).json({
          success: true,
          result: {
            earnings: referRecord.discountEarned,
            purchaseCount: referRecord.purchaseCount,
            vouchers: vouchers,
          },
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}
