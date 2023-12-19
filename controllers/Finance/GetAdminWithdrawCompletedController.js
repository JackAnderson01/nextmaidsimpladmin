import WithdrawEntity from "../../schema/finance/WithdrawSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

export default async function GetAdminWithdrawCompletedController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const withdrawRequests = await WithdrawEntity.find({
      isWithdrawApproved: { $in: [true, false] },
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
