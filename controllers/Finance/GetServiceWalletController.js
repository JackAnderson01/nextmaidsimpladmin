import Joi from "@hapi/joi";
import WalletEntity from "../../schema/finance/WalletSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const emailValidator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GetServiceWalletController(req, res) {
  const { email } = req.body;

  try {
    await ValidateTokenController(req, res, "cleaner", "user");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    } else {
      const walletDetails = await WalletEntity.findOne({ email: email });

      if (walletDetails == null) {
        return res.status(404).json({
          success: false,
          error: { message: "No Wallet found" },
        });
      }

      return res.status(200).json({
        success: true,
        result: walletDetails,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}
