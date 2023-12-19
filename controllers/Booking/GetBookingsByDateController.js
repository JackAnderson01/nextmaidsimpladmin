import BookingEntity from "../../schema/booking/BookingSchema.js";
import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController.js";

const dateValidator = Joi.object({
  date: Joi.string().min(10).required(),
  email: Joi.string().email().required(),
});

export default async function GetBookingsByDateController(req, res) {
  try {
    await ValidateTokenController(req, res, "cleaner");

    const { error } = await dateValidator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }

    const { email, date } = req.body;
    0;

    const response = await BookingEntity.find(
      {
        serviceProviderEmail: email,
        date: date,
        progress: "confirmed",
        areDetailsComplete: true,
        isPaymentDone: true,
      },
      { areDetailsComplete: 0, isPaymentDone: 0 }
    );

    if (response.length === 0) {
      return res.status(404).json({
        success: false,
        result: [],
        message: "No bookings found for the given date.",
      });
    }

    return res.status(200).json({
      success: true,
      result: response,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
