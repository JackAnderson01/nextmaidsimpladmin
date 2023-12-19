import Joi from "@hapi/joi";
import LocationEntity from "../../schema/booking/LocationSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const emailValidator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GetLocationsByEmailController(req, res) {
  const { email } = req.body;

  try {
    await ValidateTokenController(req, res, "cleaner", "user");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ success: false, error: error.details[0].message });
    } else {
      LocationEntity.find({ email: email })
        .then((response) => {
          if (response.length == 0) {
            res.status(404).json({
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
            success: false,
            error: err,
          });
        });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}
