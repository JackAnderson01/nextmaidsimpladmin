import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import BookingEntity from "../../schema/booking/BookingSchema";

const idValidator = Joi.object({
  id: Joi.string().min(3).required(),
});

export default async function GetBookingByIdController(req, res) {
  const { id } = req.body;

  try {
    await ValidateTokenController(req, res, "user");

    const { error } = await idValidator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ success: false, error: error.details[0].message });
    } else {
      const booking = await BookingEntity.findOne(
        { _id: id },
        { areDetailsComplete: 0, isPaymentDone: 0 }
      );

      if (!booking) {
        return res.status(404).json({
          success: false,
          result: response,
          message: "No results found",
        });
      }

      res.status(200).json({
        success: true,
        result: booking,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}
