import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import ServiceProviderSignUpEntity from "../../schema/service_provider/ServiceProviderSignupSchema";
import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";

const validator = Joi.object({
  email: Joi.string().email().required(),
  documents: Joi.array().min(2).max(2).required(),
});

export default async function UpdateDocumentsController(req, res) {
  try {
    await ValidateTokenController(req, res, "cleaner");

    const { email, documents } = req.body;

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const existingCleanerSignUp = await ServiceProviderSignUpEntity.findOne({
      email: email,
    });

    const existingCleaner = ServiceProviderEntity.findOne({ email: email });

    if (existingCleanerSignUp != null && existingCleaner != null) {
      const updatedCleaner = await ServiceProviderEntity.findOneAndUpdate(
        { email: email },
        {
          documents: documents,
        }
      );

      const updatedCleanerSignUp =
        await ServiceProviderSignUpEntity.findOneAndUpdate(
          { email: email },
          {
            documents: documents,
          }
        );

      return res.status(200).send({ success: true, result: updatedCleaner });
    }

    return res
      .status(404)
      .json({ success: false, result: null, message: "No such Cleaner found" });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}
