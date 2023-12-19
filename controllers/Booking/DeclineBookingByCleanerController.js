import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import BookingEntity from "../../schema/booking/BookingSchema";
import PaymentHistoryEntity from "../../schema/finance/PaymentHistorySchema";
import IsRefundCreated from "../Refund/IsRefundCreated";
import DeleteUID from "../Firebase/DeleteUID";
import FireUserEntity from "../../schema/firebase/FireUserSchema";

const validator = Joi.object({
  serviceProviderEmail: Joi.string().email().required(),
  bookingId: Joi.string().required(),
});

export default async function DeclineBookingByCleanerController(req, res) {
  try {
    await ValidateTokenController(req, res, "cleaner");

    const { serviceProviderEmail, bookingId } = req.body;

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
        error: error,
        message: "Booking does not exist",
      });
    } else if (doesBookingExist.progress == "completed") {
      const fireCleaner = await FireUserEntity.findOne({
        email: serviceProviderEmail,
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
    } else if (doesBookingExist.progress == "cancelled") {
      const fireCleaner = await FireUserEntity.findOne({
        email: serviceProviderEmail,
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
    } else {
      const updatedProgress =
        doesBookingExist.progress == "pending" ? "pending" : "cancelled";

      await BookingEntity.findOneAndUpdate(
        {
          _id: bookingId,
          "serviceProvidersArray.email": serviceProviderEmail,
          areDetailsComplete: true,
          isPaymentDone: true,
        },
        {
          progress: updatedProgress,
          $pull: { serviceProvidersArray: { email: serviceProviderEmail } },
        }
      );

      const fireCleaner = await FireUserEntity.findOne({
        email: serviceProviderEmail,
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
      error: { message: "Already cancelled by user!" },
    });
  }

  const paymentHistory = await PaymentHistoryEntity.findOne({
    bookingId: bookingId,
  });

  //TODO remove comment to check payment status
  if (
    paymentHistory == null ||
    (paymentHistory.paymentIntentId == null &&
      paymentHistory.subscriptionId == null)
  ) {
    return res
      .status(400)
      .send({ success: false, error: { message: "Not found" } });
  }

  await PostRefund(bookingId);

  return res.status(200).send({ success: true, result: result });
};
