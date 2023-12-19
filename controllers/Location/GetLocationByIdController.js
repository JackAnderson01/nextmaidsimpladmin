import Joi from "@hapi/joi";
import LocationEntity from "../../schema/booking/LocationSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const idValidator = Joi.object({
  id: Joi.string().min(3).required(),
});

export default async function GetLocationByIdController(req, res) {
  const { id } = req.body;

  try {
    await ValidateTokenController(req, res, "cleaner", "user");

    const { error } = await idValidator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ success: false, error: error.details[0].message });
    } else {
      const location = await LocationEntity.findById(id);

      if (!location) {
        return res.status(404).json({
          success: false,
          result: response,
          message: "No results found",
        });
      }

      res.status(200).json({
        success: true,
        result: location,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}
