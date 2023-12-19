import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";
import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const emailValidator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GetCleanerByEmailController(req, res) {
  const { email } = req.body;

  try {
    await ValidateTokenController(req, res, "cleaner", "user");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ Error: error.details[0].message });
    } else {
      const cleaner = await ServiceProviderEntity.findOne({ email: email });

      return res.status(200).json({
        success: true,
        result: cleaner,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
