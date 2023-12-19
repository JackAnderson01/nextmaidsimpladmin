import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import BookingEntity from "../../schema/booking/BookingSchema";

const emailValidator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GetBookingUpdatesController(req, res) {
  const { email } = req.body;

  try {
    await ValidateTokenController(req, res, "user");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ success: false, error: error.details[0].message });
    } else {
      const lastBooking = await BookingEntity.findOne(
        {
          email: email,
          progress: "confirmed",
          areDetailsComplete: true,
          isPaymentDone: true,
        }, // Query for bookings with progress equal to 'confirmed'
        { status: 1, progress: 1, _id: 1 }, // Projection - you can specify fields to include/exclude if needed
        { sort: { _id: -1 } } // Sort in descending order based on the default '_id' field
      );

      if (lastBooking == null) {
        return res.status(404).json({
          success: false,
          error: "No bookings in progress",
        });
      }

      return res.status(200).json({
        success: true,
        result: lastBooking,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}
