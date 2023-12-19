import BookingEntity from "../../schema/booking/BookingSchema.js";
import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController.js";

const emailValidator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GetBookingsByServiceProviderEmailController(
  req,
  res
) {
  const { email } = req.body;

  try {
    await ValidateTokenController(req, res, "cleaner");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ Error: error.details[0].message });
    } else {
      BookingEntity.find(
        {
          serviceProviderEmail: email,
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
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
