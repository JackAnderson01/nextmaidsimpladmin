import Joi from "@hapi/joi";
import TransactionEntity from "../../schema/finance/TransactionSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const emailValidator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GetTransactionsController(req, res) {
  const { email } = req.body;

  try {
    await ValidateTokenController(req, res, "cleaner");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    } else {
      const transactions = await TransactionEntity.find(
        {
          email: email,
          isComplete: true,
        },
        { isComplete: 0 }
      );

      if (transactions.length == 0) {
        return res.status(404).json({
          success: false,
          error: { message: "No results found" },
        });
      }

      return res.status(200).json({
        success: true,
        result: transactions,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
}
