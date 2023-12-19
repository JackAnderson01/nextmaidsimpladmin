import Joi from "@hapi/joi";
import BankDetailsEntity from "../../schema/finance/BankDetailsSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const emailValidator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GetBankDetailsController(req, res) {
  const { email } = req.body;

  try {
    await ValidateTokenController(req, res, "cleaner", "admin");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    } else {
      const bankDetails = await BankDetailsEntity.find({ email: email });

      if (!bankDetails) {
        return res.status(404).json({
          success: false,
          error: { message: "No results found" },
        });
      }

      return res.status(200).json({
        success: true,
        result: bankDetails,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}
