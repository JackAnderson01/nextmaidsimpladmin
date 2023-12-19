import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import PaymentHistoryEntity from "../../schema/finance/PaymentHistorySchema";
import { stripe } from "./stripe";
import BookingEntity from "../../schema/booking/BookingSchema";
import {
  getFinanceDate,
  getFinanceTime,
} from "../Finance/PostWidthdrawController";
import TransactionEntity from "../../schema/finance/TransactionSchema";
import SubscriptionEntity from "../../schema/booking/SubscriptionSchema";
import sendNotificationsByEmail from "../Notifications/sendNotificationByEmail";

const validator = Joi.object({
  paymentIntentId: Joi.string().min(3).required(),
});

export default async function PostStripeSucceededController(req, res) {
  try {
    await ValidateTokenController(req, res, "user");

    const { paymentIntentId } = req.body;

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const existingTransaction = await PaymentHistoryEntity.findOne({
      paymentIntentId: paymentIntentId,
    });

    if (existingTransaction == null) {
      return res.status(404).send({
        success: false,
        error: "Payment not found",
      });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      //TODO create booking

      const updatedBooking = await BookingEntity.findOneAndUpdate(
        {
          _id: existingTransaction.bookingId,
          areDetailsComplete: true,
        },
        { isPaymentDone: true }
      );

      const existingBooking = await BookingEntity.findOne({
        _id: existingTransaction.bookingId,
      });
      const finDate = getFinanceDate();
      const finTime = getFinanceTime();
      const transactionRecord = new TransactionEntity({
        email: existingBooking.userEmail,
        title: "Payment",
        subTitle: "Bank Transfer",
        date: finDate,
        time: finTime,
        amount: existingBooking.price,
        type: "deposit",
        isComplete: true,
      });
      const saveRecord = await transactionRecord.save();

      await SubscriptionEntity.findOneAndUpdate(
        { bookingId: existingTransaction.bookingId },
        { $set: { isActive: true } },
        { new: true }
      );

      if (updatedBooking == null) {
        return res.status(500).send({
          success: false,
          error: "Booking could not be updated, contact support.",
        });
      }

      sendNotificationsByEmail(
        "MaidSimpl",
        `Payment succeeded for Booking on date ${existingBooking.date} of amount \$${existingBooking.price} `,
        existingBooking.userEmail
      );

      existingBooking.serviceProvidersArray.map((provider) =>
        sendNotificationsByEmail(
          "MaidSimpl Business",
          `New Booking Request - expiring in 10 minutes`,
          provider.name
        )
      );

      return res.status(200).send({
        success: true,
        result: "Payment Succeeded, booking created",
      });
    } else {
      return res.status(200).send({
        success: false,
        error: "Payment Failed",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
}
