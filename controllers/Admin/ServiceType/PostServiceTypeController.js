import Joi from "@hapi/joi";
import { ValidateTokenController } from "../../Authentication/Token/ValidateTokenController";
import ServiceTypeEntity from "../../../schema/Price/ServiceTypeSchema";

const validator = Joi.object({
  name: Joi.string().valid("base", "deep").required(),
  price: Joi.number().positive().required(),
});

export default async function PostServiceTypeController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { name, price } = req.body;

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const loweredName = name.toLowerCase();

    const existingService = await ServiceTypeEntity.findOne({
      name: loweredName,
    });
    if (existingService) {
      const updatedService = await ServiceTypeEntity.findOneAndUpdate(
        { name: loweredName },
        {
          price: price,
        }
      );

      return res.status(200).send({ success: true, result: updatedService });
    }

    res.status(400).json({ success: false, error: "" });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}
