import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import SubscriptionEntity from "../../schema/booking/SubscriptionSchema";

const validator = Joi.object({
  subscriptionId: Joi.string().min(3).required(),
  extras: Joi.array()
    .items(
      Joi.string().valid(
        "oven",
        "windows",
        "fridge",
        "cabinets",
        "organizing",
        "dishwasher",
        "garage",
        "blinds",
        "microwave"
      )
    )
    .allow(null)
    .required(),
});

export default async function UpdateSubscriptionController(req, res) {
  try {
    await ValidateTokenController(req, res, "user");

    const { subscriptionId, extras } = req.body;

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const existingSubscription = await SubscriptionEntity.findOne({
      _id: subscriptionId,
    });

    if (existingSubscription != null) {
      const updatedSub = await SubscriptionEntity.findOneAndUpdate(
        { _id: subscriptionId },
        {
          extras: extras,
        }
      );

      return res.status(200).send({ success: true, result: updatedSub });
    }

    return res.status(404).json({
      success: false,
      result: null,
      message: "No such subscription found",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}
