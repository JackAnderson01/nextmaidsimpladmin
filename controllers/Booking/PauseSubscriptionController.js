import SubscriptionEntity from "../../schema/booking/SubscriptionSchema";
import Joi from "@hapi/joi";
import { stripe } from "../Stripe/stripe";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import PaymentHistoryEntity from "../../schema/finance/PaymentHistorySchema";

const validator = Joi.object({
  subscriptionId: Joi.string().min(3).required(),
});

export default async function PauseSubscriptionController(req, res) {
  const { subscriptionId } = req.body;

  try {
    await ValidateTokenController(req, res, "user");

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res.status(400).send({ success: false, error: error });
    }

    const subExists = await SubscriptionEntity.findOne({ _id: subscriptionId });

    if (subExists != null) {
      // const subscription = await stripe.subscriptions.cancel(subscriptionId); //Todo not uncomment

      const updatedSubscription = await SubscriptionEntity.findOneAndUpdate(
        { _id: subscriptionId },
        {
          isActive: false,
        }
      );

      const paymentHistory = await PaymentHistoryEntity.findOne({
        bookingId: subExists.bookingId,
      });
      if (paymentHistory == null || paymentHistory.subscriptionId == null) {
        return res.status(400).json({
          success: false,
          result: "Subscription Paused, no payment found",
        });
      } else if (
        paymentHistory != null &&
        paymentHistory.subscriptionId != null
      ) {
        //TODO uncomment
        const pausedSubscription = await stripe.subscriptions.update(
          paymentHistory.subscriptionId,
          {
            pause_collection: {
              behavior: "void",
            },
          }
        );
      }

      return res.status(200).json({
        success: true,
        result: "Cancelled subscription successfully",
      });
    }

    res.status(404).json({
      success: false,
      error: "No such subscription found!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}
