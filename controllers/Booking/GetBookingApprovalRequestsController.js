import BookingEntity from "../../schema/booking/BookingSchema.js";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController.js";

export default async function GetBookingApprovalRequestsController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    BookingEntity.find(
      {
        serviceProviderEmail: null,
        areDetailsComplete: true,
        isPaymentDone: true,
      },
      { areDetailsComplete: 0, isPaymentDone: 0 }
    )
      .then((response) => {
        if (response.length == 0) {
          res.status(404).json({
            success: true,
            result: response,
            message: "No results found",
          });
        } else {
          res.status(200).json({
            success: true,
            result: response,
          });
        }
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
