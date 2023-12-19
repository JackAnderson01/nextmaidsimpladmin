import PaymentHistoryEntity from "../../schema/finance/PaymentHistorySchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import IsRefundCreated from "../Refund/IsRefundCreated";
import PostRefund from "../Refund/PostRefund";
import { stripe } from "./stripe";
import Joi from "@hapi/joi";

const idValidator = Joi.object({
  bookingId: Joi.string().min(5).required(),
  // subscriptionId: Joi.string().min(5).required().allow(null),
});

export default async function RefundStripeController(req, res) {
  const { bookingId /*, subscriptionId*/ } = req.body;

  try {
    await ValidateTokenController(req, res, "user", "cleaner");

    const { error } = await idValidator.validateAsync(req.body);

    if (error) {
      return res.status(400).send({ success: false, error: error });
    }

    const hasRefunded = await IsRefundCreated(bookingId);
    if (hasRefunded) {
      return res.status(400).json({
        success: false,
        error: { message: "Already refunded!" },
      });
    }

    const paymentHistory = await PaymentHistoryEntity.findOne({
      bookingId: bookingId,
    });

    if (
      paymentHistory.paymentIntentId == null &&
      paymentHistory.subscriptionId == null
    ) {
      return res
        .status(400)
        .send({ success: false, error: { message: "No payment found" } });
    }

    // if (paymentHistory.subscriptionId != null) {
    //   await cancelSubscription(paymentHistory.subscriptionId, res);

    // if(subscriptionId !=null){
    //   const updatedSubscription = await SubscriptionEntity.findOneAndUpdate(
    //     { _id: subscriptionId },
    //     {
    //       isActive: false,
    //     }
    //   );
    // }

    // }

    //TODO: MOVE to Admin for refund creation
    // const timeApart = calculateTime(booking.date, booking.time);

    // const paymentIntent = await stripe.paymentIntents.retrieve(
    //   paymentHistory.paymentIntentId
    // );

    // const refund = await stripe.refunds.create({
    //   payment_intent: paymentIntent,
    //   amount:
    //     timeApart > 48
    //       ? paymentIntent.amount
    //       : timeApart > 24
    //       ? paymentIntent.amount / 2
    //       : 0,
    // });

    await PostRefund(bookingId);

    res.status(200).json({
      success: true,
      paymentIntent,
      result: refund,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}

// const calculateTime = (date, time) => {
//   const inputDateTime = new Date(`${date} ${time}`);
//   const currentDateTime = new Date();
//   const timeDifferenceMillis = inputDateTime - currentDateTime;
//   return timeDifferenceMillis / (1000 * 60 * 60);
// };

export const cancelSubscription = async (subscriptionId) => {
  try {
    if (subscriptionId != null) {
      const subscription = await stripe.subscriptions.cancel(subscriptionId);

      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
