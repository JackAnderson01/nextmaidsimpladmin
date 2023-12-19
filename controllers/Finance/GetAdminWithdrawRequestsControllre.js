import Joi from "@hapi/joi";
import WithdrawEntity from "../../schema/finance/WithdrawSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

// const emailValidator = Joi.object({
//   email: Joi.string().email().required(),
// });

export default async function GetAdminWithdrawRequestsController(req, res) {
  // const { email } = req.body;

  try {
    await ValidateTokenController(req, res, "admin");

    // const { error } = await emailValidator.validateAsync(req.body);

    const withdrawRequests = await WithdrawEntity.find({
      isWithdrawApproved: null,
    });

    if (withdrawRequests.length == 0) {
      return res.status(404).json({
        success: false,
        result: [],
        error: { message: "No results found" },
      });
    }

    return res.status(200).json({
      success: true,
      result: withdrawRequests,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
}
