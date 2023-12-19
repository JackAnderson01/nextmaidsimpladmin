import BookingEntity from "../../schema/booking/BookingSchema.js";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController.js";

export default async function GetAllBookingsController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    BookingEntity.find(
      { areDetailsComplete: true, isPaymentDone: true },
      { areDetailsComplete: 0, isPaymentDone: 0 }
    )
      .then((response) => {
        res.status(200).json({
          success: true,
          result: response,
        });
      })
      .catch((err) => {
        res.status(422).json({
          error: err,
        });
      });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
