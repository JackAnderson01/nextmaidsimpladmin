import RefundedEntity from "../../schema/finance/RefundedSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

export default async function GetRefundCompletedController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    RefundedEntity.find({ isRefunded: true })
      .then((response) => {
        res.status(200).json({
          success: true,
          result: response,
        });
      })
      .catch((err) => {
        res.status(422).json({
          success: false,
          error: err,
        });
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}
