import Joi from "@hapi/joi";
import AvailabilityEntity from "../../schema/service_provider/AvailabilitySchema";
import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const availabilityValidator = Joi.object({
  email: Joi.string().email().required(),
  dateFrom: Joi.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/)
    .required(),
  dateTill: Joi.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/)
    .required(),
  timeFrom: Joi.string()
    .regex(/^(0[0-9]|1[0-2]):[0-5][0-9] AM|PM$/)
    .required(),
  timeTill: Joi.string()
    .regex(/^(0[0-9]|1[0-2]):[0-5][0-9] AM|PM$/)
    .required(),
  excludeWeekends: Joi.boolean().required(),
});

export default async function PostAvailabilityController(req, res) {
  try {
    await ValidateTokenController(req, res, "cleaner");

    const { email, dateFrom, dateTill, timeFrom, timeTill, excludeWeekends } =
      req.body;

    const { error } = await availabilityValidator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ success: false, error: error });
    } else {
      const emailExist = await ServiceProviderEntity.findOne({ email: email });

      if (!emailExist) {
        return res
          .status(404)
          .json({ success: false, message: "No such Cleaner found" });
      }

      const availabilityExist = await AvailabilityEntity.findOne({
        email: email,
      });

      if (availabilityExist) {
        const updateResult = await AvailabilityEntity.findOneAndUpdate(
          { email: email },
          {
            dateFrom,
            dateTill,
            timeFrom,
            timeTill,
            excludeWeekends,
          },
          { new: true }
        );

        if (updateResult) {
          res.status(200).json({ success: true, result: updateResult });
        } else {
          res
            .status(200)
            .json({ success: false, message: "No documents were modified" });
        }
      } else {
        const availability = new AvailabilityEntity({
          email,
          dateFrom,
          dateTill,
          timeFrom,
          timeTill,
          excludeWeekends,
        });

        const savedAvailability = await availability.save();
        res.status(200).json({ success: true, result: savedAvailability });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}
