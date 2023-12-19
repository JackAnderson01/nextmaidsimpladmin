import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";

const emailValidator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GetCleanerDocumentsController(req, res) {
  const { email } = req.body;

  try {
    await ValidateTokenController(req, res, "cleaner");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const cleaner = await ServiceProviderEntity.findOne({ email: email });

    if (cleaner !== null) {
      return res.status(200).json({
        success: true,
        result: { documents: cleaner.documents },
      });
    }

    return res.status(404).json({
      success: false,
      error: "No cleaner found found",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}
