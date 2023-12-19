import BookingEntity from "../../schema/booking/BookingSchema";
import PaymentHistoryEntity from "../../schema/finance/PaymentHistorySchema";
import RefundedEntity from "../../schema/finance/RefundedSchema";
import sendNotificationsByEmail from "../Notifications/sendNotificationByEmail";
import { stripe } from "../Stripe/stripe";

export default async function PostRefund(bookingId) {
  // console.log("postREFUND 8");

  const existingRefund = await RefundedEntity.findOne({ bookingId: bookingId });

  // console.log("postREFUND 13");
  // console.log(existingRefund);
  // console.log(bookingId);

  if (existingRefund != null) {
    // console.log("postREFUND 14");

    return false; // not created, refund already exists
  } else {
    // console.log("postREFUND 20");

    const existingBooking = await BookingEntity.findOne({
      _id: bookingId,
      areDetailsComplete: true,
    });
    // console.log(existingBooking);
    // console.log("postREFUND 26");

    const paymentHistory = await PaymentHistoryEntity.findOne({
      bookingId: bookingId,
    });

    // console.log("postREFUND 33");
    // console.log(paymentHistory);

    if (paymentHistory != null && paymentHistory.paymentIntentId != null) {
      // console.log("postREFUND 38");

      const paymentIntent = await stripe.paymentIntents.retrieve(
        // "pi_3OHw1gLRnhmwxG560cO8on0m"
        paymentHistory.paymentIntentId
      );

      // console.log(paymentIntent);
      // console.log("postREFUND 44");

      if (paymentIntent.status === "succeeded") {
        // console.log("postREFUND 49");

        const date = new Date(paymentIntent.created * 1000);

        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        const formattedDate = date.toLocaleDateString("en-US", options);

        // console.log(formattedDate);

        const timeApart = calculateTime(
          existingBooking.date,
          existingBooking.time
        );

        // console.log("postREFUND 63");
        // console.log(paymentIntent.payment_method.card != null);

        // console.log("postREFUND 60");
        // console.log(bookingId);
        // console.log(existingBooking.name);
        // console.log(existingBooking.userEmail);
        // console.log(formattedDate);
        // console.log(paymentHistory.paymentIntentId);
        // console.log(timeApart);
        // console.log(
        //   timeApart > 48
        //     ? paymentIntent.amount
        //     : timeApart > 24
        //     ? paymentIntent.amount / 2
        //     : 0
        // );
        // console.log(paymentIntent.payment_method);
        // console.log(paymentIntent.card.last4);

        const paymentMethod = await stripe.paymentMethods.retrieve(
          paymentIntent.payment_method
        );

        if (paymentMethod.card != null) {
          // console.log("postREFUND 61");
          // console.log(bookingId);
          // console.log(existingBooking.name);
          // console.log(existingBooking.userEmail);
          // console.log(paymentMethod.card);
          // console.log(paymentMethod.card.last4);

          // console.log(formattedDate);
          // console.log(paymentHistory.paymentIntentId);
          // console.log(timeApart);
          // console.log(
          //   timeApart > 48
          //     ? paymentIntent.amount
          //     : timeApart > 24
          //     ? paymentIntent.amount / 2
          //     : 0
          // );

          const finalRefundAmount =
            timeApart > 48
              ? paymentIntent.amount
              : timeApart > 24
              ? paymentIntent.amount / 2
              : 0;
          const refundRecord = new RefundedEntity({
            bookingId: bookingId,
            isRefunded: false,
            name: existingBooking.name,
            email: existingBooking.userEmail,
            cardDetails: paymentMethod.card.last4,
            paymentDate: formattedDate,
            paymentId: paymentHistory.paymentIntentId,
            refundAmount: finalRefundAmount,
          });

          // console.log("postREFUND 83");

          await refundRecord.save();

          sendNotificationsByEmail(
            "MaidSimpl",
            `Refund request sent for \$${finalRefundAmount} from ${existingBooking.userEmail} on ${formattedDate}`,
            existingBooking.userEmail
          );

          // console.log("postREFUND 88");

          return true; // created successfully
        }
      }
    }
  }
  // console.log("postREFUND 84");

  return false;
}

const calculateTime = (date, time) => {
  const inputDateTime = new Date(`${date} ${time}`);
  const currentDateTime = new Date();
  const timeDifferenceMillis = inputDateTime - currentDateTime;
  return timeDifferenceMillis / (1000 * 60 * 60);
};
