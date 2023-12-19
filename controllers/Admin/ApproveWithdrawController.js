import Joi from "@hapi/joi";
import WithdrawEntity from "../../schema/finance/WithdrawSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import TransactionEntity from "../../schema/finance/TransactionSchema";
import sendNotificationsByEmail from "../Notifications/sendNotificationByEmail";

const validator = Joi.object({
  id: Joi.string().min(3).required(),
  isApproved: Joi.bool().required(),
});

export default async function ApproveWithdrawController(req, res) {
  const { id, isApproved } = req.body;

  try {
    await ValidateTokenController(req, res, "admin");

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const withdrawRequest = await WithdrawEntity.findOne({
      _id: id,
    });

    if (withdrawRequest == null) {
      return res.status(404).json({
        success: false,
        error: "No such withdraw found",
      });
    } else {
      const updatedWithdraw = await WithdrawEntity.findOneAndUpdate(
        {
          _id: id,
        },
        {
          isWithdrawApproved: isApproved,
        }
      );

      await TransactionEntity.updateOne(
        {
          _id: updatedWithdraw.transactionId,
        },
        {
          isComplete: true,
        }
      );

      if (isApproved == false) {
        sendNotificationsByEmail(
          "MaidSimpl",
          "Withdraw Request declined by admin",
          withdrawRequest.email
        );
      } else {
        sendNotificationsByEmail(
          "MaidSimpl",
          "Withdraw Request has been approved by admin",
          withdrawRequest.email
        );
      }

      return res.status(200).json({
        success: true,
        result: updatedWithdraw,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
}
