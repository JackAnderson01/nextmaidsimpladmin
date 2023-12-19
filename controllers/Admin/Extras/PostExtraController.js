import Joi from "@hapi/joi";
import { ValidateTokenController } from "../../Authentication/Token/ValidateTokenController";
import ExtraEntity from "../../../schema/Price/ExtraSchema";

const validListValues = [
  "oven",
  "windows",
  "fridge",
  "cabinets",
  "organizing",
  "dishwasher",
  "garage",
  "blinds",
  "microwave",
];

// Define the validator schema
const validator = Joi.object({
  extras: Joi.array().items(
    Joi.object({
      serviceName: Joi.string()
        .valid(...validListValues)
        .required(),
      price: Joi.number().positive().required(),
    })
  ),
});

export default async function PostExtraController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { extras } = req.body;

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const result = [];

    for (const item of extras) {
      const result1 = await ExtraEntity.updateMany(
        { serviceName: item.serviceName },
        { $set: { price: item.price } },
        { upsert: true }
      );

      result.push(result1);
    }

    const updatedRecords = await ExtraEntity.find({});

    return res.status(200).send({ success: true, result: updatedRecords });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}
