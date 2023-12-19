import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import BookingEntity from "../../schema/booking/BookingSchema";
import FireUserEntity from "../../schema/firebase/FireUserSchema";
import AddUID from "../Firebase/AddUID";
import DeleteUID from "../Firebase/DeleteUID";
import sendNotificationsByEmail from "../Notifications/sendNotificationByEmail";

const validator = Joi.object({
  serviceProviderEmail: Joi.string().email().required(),
  bookingId: Joi.string().required(),
});

export default async function AcceptBookingController(req, res) {
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
        serviceProviderEmail: null,
        areDetailsComplete: true,
      },
      { areDetailsComplete: 0, isPaymentDone: 0 }
    );

    if (doesBookingExist == null) {
      return res.status(404).send({
        success: false,
        error: error,
        message: "Booking does not exist",
      });
    } else {
      const result = await BookingEntity.findOneAndUpdate(
        { _id: bookingId },
        {
          serviceProviderEmail: serviceProviderEmail,
          progress: "confirmed",
          areDetailsComplete: true,
        },
        { areDetailsComplete: 0, isPaymentDone: 0 }
      );

      await BookingEntity.findOneAndUpdate(
        {
          _id: bookingId,
          "serviceProvidersArray.email": serviceProviderEmail,
        },
        {
          $set: {
            "serviceProvidersArray.$.accepted": true,
          },
        },
        {
          new: true,
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
        await DeleteUID(fireCleaner.uid, fireUser.uid, "users");
        await AddUID(fireCleaner.uid, fireUser.uid);
      }

      sendNotificationsByEmail(
        "MaidSimpl",
        `Booking Accepted by ${serviceProviderEmail}`,
        doesBookingExist.userEmail
      );
      sendNotificationsByEmail(
        "MaidSimpl Business",
        `Booking Accepted for ${doesBookingExist.userEmail}`,
        serviceProviderEmail
      );

      return res.status(200).send({ success: true, result: result });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}
