import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import BankDetailsEntity from "../../schema/finance/BankDetailsSchema";

const validator = Joi.object({
  id: Joi.string().min(3).required(),
});

export default async function DeleteBankDetailsController(req, res) {
  const { id } = req.body;

  try {
    await ValidateTokenController(req, res, "cleaner");

    const { error } = validator.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid id",
      });
    }

    const response = await BankDetailsEntity.deleteOne({ _id: id });

    if (response.deletedCount === 1) {
      return res.status(200).json({
        success: true,
        message: "Bank Details record deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Bank Details record not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
