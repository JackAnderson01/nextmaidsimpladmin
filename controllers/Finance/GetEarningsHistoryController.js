import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import TransactionEntity from "../../schema/finance/TransactionSchema";

const emailValidator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GetEarningsHistoryController(req, res) {
  const { email } = req.body;

  try {
    await ValidateTokenController(req, res, "cleaner");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, Error: error.details[0].message });
    }

    const transactions = await TransactionEntity.find({ email: email });

    if (transactions.length == 0) {
      res.status(404).json({
        success: false,
        result: response,
        message: "No results found",
      });
    } else {
      const earningRecords = transactions.filter((e) => e.type === "deposit");

      if (earningRecords.length > 0) {
        res.status(200).json({
          success: true,
          result: earningRecords,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "No deposit transactions found.",
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
