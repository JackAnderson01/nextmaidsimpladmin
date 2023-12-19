import Joi from "@hapi/joi";
import ReferCodeEntity from "../../schema/feedback_rewards/ReferCodeSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const emailValidator = Joi.object({
  userEmail: Joi.string().email().required(),
});

export function generateReferralCode(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let referralCode = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    referralCode += characters.charAt(randomIndex);
  }

  return referralCode;
}

export default async function GetReferCodeByEmailController(req, res) {
  const { userEmail } = req.body;

  try {
    await ValidateTokenController(req, res, "user");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ Error: error.details[0].message });
    } else {
      const existingReferCode = await ReferCodeEntity.findOne({
        email: userEmail,
      });

      res.status(200).json({ success: true, result: existingReferCode });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
