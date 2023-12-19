import Joi from "@hapi/joi";
import VoucherEntity from "../../schema/feedback_rewards/VoucherSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import ReferCodeEntity from "../../schema/feedback_rewards/ReferCodeSchema";
import { generateReferralCode } from "./getReferCodeByEmailController";

const emailValidator = Joi.object({
  userEmail: Joi.string().email().required(),
});

export default async function redeemVoucherController(req, res) {
  const { userEmail } = req.body;

  try {
    await ValidateTokenController(req, res, "user");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ Error: error.details[0].message });
    } else {
      const referRecord = await ReferCodeEntity.findOne({ email: userEmail });

      if (referRecord != null && referRecord.purchaseCount >= 5) {
        await ReferCodeEntity.findOneAndUpdate(
          {
            email: userEmail,
          },
          {
            $inc: { purchaseCount: -5 },
          }
        );

        const today = new Date();

        const date =
          today.getDate() +
          "-" +
          today.getMonth() +
          "-" +
          (today.getFullYear() + 1);

        const voucherRecord = new VoucherEntity({
          email: userEmail,
          discountTitle: "Big Reward! Enjoy 20% off",
          discountCode: `${generateReferralCode(4)}`,
          expiryDate: date,
          discountPercent: 0.2,
          discountPrice: 0,
        });

        await voucherRecord.save();

        res.status(200).json({ success: true });
      } else {
        res.status(200).json({ success: false });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}
