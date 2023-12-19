import Joi from "@hapi/joi";
import { ValidateTokenController } from "../../Authentication/Token/ValidateTokenController";
import HowOftenEntity from "../../../schema/Price/HowOftenSchema";

const validator = Joi.object({
  name: Joi.string()
    .valid("biweekly", "weekly", "onetime", "monthly")
    .required(),
  discount: Joi.number().min(0.01).max(1).required(),
});

export default async function PostHowOftenController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { name, discount } = req.body;

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const loweredName = name.toLowerCase();

    const existingHowOften = await HowOftenEntity.findOne({
      name: loweredName,
    });
    if (existingHowOften) {
      const updatedHowOften = await HowOftenEntity.findOneAndUpdate(
        { name: loweredName },
        {
          discount: 1 - discount,
        }
      );

      return res.status(200).send({
        success: true,
        result: { name: loweredName, discount: discount },
      });
    }

    return res.status(400).send({ success: false, error: "" });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}
