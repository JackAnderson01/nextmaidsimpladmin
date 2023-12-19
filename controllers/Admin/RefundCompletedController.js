import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import RefundedEntity from "../../schema/finance/RefundedSchema";

const validator = Joi.object({
  id: Joi.string().min(3).required(),
});

export default async function RefundCompletedController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { id } = req.body;
    const { error } = validator.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }

    const existingRefund = await RefundedEntity.findOne({ _id: id });

    if (existingRefund) {
      const updatedRefund = await RefundedEntity.findOneAndUpdate(
        { _id: id },
        {
          isRefunded: true,
        },
        { new: true }
      );

      if (updatedRefund == null) {
        return res
          .status(200)
          .json({ success: false, error: "Refund not updated" });
      }

      return res.status(200).json({ success: true, result: updatedRefund });
    }

    return res
      .status(201)
      .json({ success: false, error: "No such Refund found" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
