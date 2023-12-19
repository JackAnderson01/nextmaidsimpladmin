import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import BookingEntity from "../../schema/booking/BookingSchema";
import PaymentHistoryEntity from "../../schema/finance/PaymentHistorySchema";
import IsRefundCreated from "../Refund/IsRefundCreated";
import { stripe } from "../Stripe/stripe";
import PostRefund from "../Refund/PostRefund";
import FireUserEntity from "../../schema/firebase/FireUserSchema";
import DeleteUID from "../Firebase/DeleteUID";
import sendNotificationsByEmail from "../Notifications/sendNotificationByEmail";

const validator = Joi.object({
  bookingId: Joi.string().required(),
});

export default async function DeclineBookingByUserController(req, res) {
  try {
    await ValidateTokenController(req, res, "user");

    const { bookingId } = req.body;

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res.status(400).send({ success: false, error: error });
    }

    const doesBookingExist = await BookingEntity.findOne(
      {
        _id: bookingId,
        areDetailsComplete: true,
        isPaymentDone: true,
      },
      { areDetailsComplete: 0, isPaymentDone: 0 }
    );

    if (doesBookingExist == null) {
      return res.status(404).send({
        success: false,
        error: "Booking does not exist",
      });
    } else if (doesBookingExist.progress == "cancelled") {
      const fireCleaner = await FireUserEntity.findOne({
        email: doesBookingExist.serviceProviderEmail,
      });
      const fireUser = await FireUserEntity.findOne({
        email: doesBookingExist.userEmail,
      });

      if (fireCleaner != null && fireUser != null) {
        await DeleteUID(fireCleaner.uid, fireUser.uid, "cleaners");
        await DeleteUID(fireUser.uid, fireCleaner.uid, "users");
      }

      return res.status(400).send({
        success: false,
        error: "Booking already cancelled",
      });
    } else if (doesBookingExist.progress == "completed") {
      const fireCleaner = await FireUserEntity.findOne({
        email: doesBookingExist.serviceProviderEmail,
      });
      const fireUser = await FireUserEntity.findOne({
        email: doesBookingExist.userEmail,
      });

      if (fireCleaner != null && fireUser != null) {
        await DeleteUID(fireCleaner.uid, fireUser.uid, "cleaners");
        await DeleteUID(fireUser.uid, fireCleaner.uid, "users");
      }

      return res.status(400).send({
        success: false,
        error: "Cannot cancel, an already cancelled booking",
      });
    } else {
      const updatedBooking = await BookingEntity.findOneAndUpdate(
        {
          _id: bookingId,
          areDetailsComplete: true,
          isPaymentDone: true,
        },
        {
          progress: "cancelled",
        },
        { areDetailsComplete: 0, isPaymentDone: 0 }
      );

      const fireCleaner = await FireUserEntity.findOne({
        email: doesBookingExist.serviceProviderEmail,
      });
      const fireUser = await FireUserEntity.findOne({
        email: doesBookingExist.userEmail,
      });

      if (fireCleaner != null && fireUser != null) {
        await DeleteUID(fireCleaner.uid, fireUser.uid, "cleaners");
        await DeleteUID(fireUser.uid, fireCleaner.uid, "users");
      }

      const result = await BookingEntity.findOne(
        {
          _id: bookingId,
          areDetailsComplete: true,
          isPaymentDone: true,
        },
        { areDetailsComplete: 0, isPaymentDone: 0 }
      );

      sendNotificationsByEmail(
        "MaidSimpl",
        `Booking cancelled for date ${result.date}`,
        result.userEmail
      );

      if (result.serviceProviderEmail != null) {
        sendNotificationsByEmail(
          "MaidSimpl Business",
          `Booking cancelled by User ${result.preferredName}`,
          result.serviceProviderEmail
        );
      } else {
        result.serviceProvidersArray.map((provider) =>
          sendNotificationsByEmail(
            "MaidSimpl Business",
            `Booking cancelled by User ${result.preferredName}`,
            provider.user
          )
        );
      }

      //   return res.status(200).send({ success: true, result: result });

      return refundPayment(bookingId, result, res);
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}

const refundPayment = async (bookingId, result, res) => {
  const hasRefunded = await IsRefundCreated(bookingId);
  if (hasRefunded) {
    return res.status(400).json({
      success: false,
      error: { message: "Already cancelled!" },
    });
  }

  // console.log("post refund 75");

  const paymentHistory = await PaymentHistoryEntity.findOne({
    bookingId: bookingId,
  });

  // console.log("post refund 80");

  //TODO remove comment to check payment status
  if (
    paymentHistory == null ||
    (paymentHistory.paymentIntentId == null &&
      paymentHistory.subscriptionId == null)
  ) {
    // console.log("post refund 86");

    // await PostRefund(bookingId); //TODO comment or remove code

    // return res.status(200).send({ success: true, result: result });
    return res //TODO uncomment
      .status(400)
      .send({ success: false, error: { message: "No payment found" } });
  }

  //TODO uncomment
  else if (paymentHistory.paymentIntentId != null) {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentHistory.paymentIntentId
    );

    if (paymentIntent.status === "succeeded") {
      await PostRefund(bookingId);
    } else {
      return res.status(200).send({
        success: false,
        result: "No payment found",
      });
    }
  }

  // console.log("post refund 110");
  // await PostRefund(bookingId); //TODO comment or remove code

  return res.status(200).send({ success: true, result: result });
};
