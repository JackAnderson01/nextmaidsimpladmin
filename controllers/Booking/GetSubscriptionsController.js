import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController.js";
import SubscriptionEntity from "../../schema/booking/SubscriptionSchema.js";
import BookingEntity from "../../schema/booking/BookingSchema.js";

const emailValidator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GetSubscriptionsController(req, res) {
  const { email } = req.body;

  try {
    await ValidateTokenController(req, res, "user");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ Error: error.details[0].message });
    } else {
      const subs = await SubscriptionEntity.find({ email: email });

      const responses = [];

      for (const sub of subs) {
        const booking = await BookingEntity.findOne(
          { _id: sub.bookingId, areDetailsComplete: true, isPaymentDone: true },
          { areDetailsComplete: 0, isPaymentDone: 0 }
        );
        if (booking) {
          responses.push({
            ...sub._doc,
            booking: booking,
          });
        }
      }

      if (responses.length == 0) {
        return res.status(404).json({
          success: true,
          result: responses,
          message: "No results found",
        });
      }
      return res.status(200).json({
        success: true,
        result: responses,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
