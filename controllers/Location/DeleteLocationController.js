import Joi from "@hapi/joi";
import LocationEntity from "../../schema/booking/LocationSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const validator = Joi.object({
  id: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});

export default async function deleteLocationController(req, res) {
  const { id, email } = req.body;

  try {
    await ValidateTokenController(req, res, "cleaner", "user");

    const { error } = validator.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid id or email provided",
      });
    }

    const response = await LocationEntity.deleteOne({ _id: id, email: email });

    if (response.deletedCount === 1) {
      return res.status(200).json({
        success: true,
        message: "Location deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
