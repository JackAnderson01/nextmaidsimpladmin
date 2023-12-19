import UserEntity from "../../schema/user/UserSchema";
import Joi from "@hapi/joi";
import VoucherEntity from "../../schema/feedback_rewards/VoucherSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const emailValidator = Joi.object({
  userEmail: Joi.string().email().required(),
});

export default async function GetVouchersByEmailController(req, res) {
  const { userEmail } = req.body;

  try {
    await ValidateTokenController(req, res, "user");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ Error: error.details[0].message });
    } else {
      const user = await UserEntity.findOne({ email: userEmail });

      if (!user) {
        return res.status(400).send({ Error: "No such user found!" });
      }

      const existingVouchers = await VoucherEntity.find({ email: userEmail });

      if (existingVouchers.length == 0) {
        res
          .status(200)
          .json({ success: false, result: [], message: "No results found" });
      } else {
        res.status(200).json({ success: true, result: existingVouchers });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}
