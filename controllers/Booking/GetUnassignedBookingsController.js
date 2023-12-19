import BookingEntity from "../../schema/booking/BookingSchema.js";
import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController.js";
// import ServiceProviderEntity from "../../schema/ServiceProviderSchema.js";

const validator = Joi.object({
  // city: Joi.string().min(3).required(),
  serviceProviderEmail: Joi.string().email().required(),
});

export default async function GetUnassignedBookingsController(req, res) {
  const { serviceProviderEmail } = req.body;

  try {
    await ValidateTokenController(req, res, "cleaner");

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ error: error.details[0].message });
    } else {
      // const cleaner = await ServiceProviderEntity.findOne({email: serviceProviderEmail});

      BookingEntity.find(
        {
          serviceProviderEmail: null,
          // city: cleaner.city,
          "serviceProvidersArray.email": serviceProviderEmail,
          areDetailsComplete: true,
          isPaymentDone: true,
        },
        { areDetailsComplete: 0, isPaymentDone: 0 }
      )
        .then((response) => {
          if (response.length == 0) {
            res.status(200).json({
              success: false,
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
