import Joi from "@hapi/joi";
import LocationEntity from "../../schema/booking/LocationSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const locationValidator = Joi.object({
  id: Joi.string().min(3).allow(null),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().default("USA"),
  postal: Joi.string().allow(null).default(""),
});

export default async function PostLocationController(req, res) {
  try {
    await ValidateTokenController(req, res, "cleaner", "user");

    const {
      id,
      email,
      address,
      latitude,
      longitude,
      city,
      state,
      country,
      postal,
    } = req.body;

    const { error } = await locationValidator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const existingLocation = await LocationEntity.findById(id);
    if (existingLocation) {
      const updatedLocation = await LocationEntity.findOneAndUpdate(
        { _id: id },
        {
          email,
          address,
          latitude,
          longitude,
          city,
          state,
          country,
          postal: postal ?? "",
        }
      );

      return res.status(200).send({ success: true, result: updatedLocation });
    }

    const newLocation = new LocationEntity({
      email,
      address,
      latitude,
      longitude,
      city,
      state,
      country,
      postal: postal ?? "",
    });

    const savedLocation = await newLocation.save();
    res.status(201).json({ success: true, result: savedLocation });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}
