import Joi from "@hapi/joi";
import SubscriptionEntity from "../../schema/booking/SubscriptionSchema";
import PaymentHistoryEntity from "../../schema/finance/PaymentHistorySchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import { stripe } from "../Stripe/stripe";

const subscriptionValidator = Joi.object({
  bookingId: Joi.string().min(3).required(),
  subscriptionId: Joi.string().min(3).required(),
});

export default async function ResumeSubscriptionController(req, res) {
  try {
    await ValidateTokenController(req, res, "user");

    const { subscriptionId, bookingId } = req.body;

    const { error } = await subscriptionValidator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const existingSubscription = await SubscriptionEntity.findById(
      subscriptionId
    );

    if (existingSubscription) {
      const paymentRecord = await PaymentHistoryEntity.findOne({ bookingId });

      //TODO uncomment this
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentRecord.paymentIntentId
      );

      if (paymentIntent.status !== "succeeded") {
        return res.status(400).send({
          success: false,
          result: "Payment Failed, can't resume without payment!",
        });
      }

      var subscription = null; //TODO remove if block and move code out of if block

      const paymentHistory = await PaymentHistoryEntity.findOne({
        bookingId: bookingId,
      });
      if (paymentHistory == null || paymentHistory.subscriptionId == null) {
        return res.status(400).json({
          success: false,
          result: "Cannot resume subscription, no payment found",
        });
      } else if (
        paymentHistory != null &&
        paymentHistory.subscriptionId != null
      ) {
        subscription = await stripe.subscriptions.update(
          paymentHistory.subscriptionId,
          {
            pause_collection: null,
          }
        );
      }

      // if (paymentRecord != null) {
      //   //TODO uncomment this
      //   subscription = await stripe.subscriptions.update(subscriptionId, {
      //     pause_collection: false,
      //   });
      // }

      const updatedSubscription = await SubscriptionEntity.findOneAndUpdate(
        { _id: subscriptionId },
        {
          isActive: true,
        }
      );

      return res
        .status(200)
        .send({ success: true, result: updatedSubscription });
    }

    return res
      .status(404)
      .json({ success: false, error: "No such subscription found" });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}
