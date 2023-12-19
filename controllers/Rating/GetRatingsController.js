import Joi from "@hapi/joi";
import Rating from "../../schema/feedback_rewards/RatingsSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const validator = Joi.object({
  page: Joi.number().allow(null),
});

export default async function GetRatingsController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res.status(400).send({ Error: error });
    }

    const page = parseInt(req.body.page) || 1; // Page number, default is 1
    const limit = parseInt(req.query.limit) || 20; // Number of items per page, default is 10

    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const recordsCount = await Rating.find({}, { _id: 1 });

    Rating.find({})
      .skip(skip)
      .limit(limit)
      .then((response) => {
        res.status(200).json({
          success: true,
          result: response,
          currentPage: page,
          totalPages: Math.ceil(recordsCount.length / limit),
        });
      })
      .catch((err) => {
        res.status(422).json({
          error: err,
        });
      });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
