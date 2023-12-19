import Joi from "@hapi/joi";
import RatingEntity from "../../schema/feedback_rewards/RatingsSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const validator = Joi.object({
  page: Joi.number().allow(null),
});

export default async function GetUnapproveRatingsController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res.status(400).send({ Error: error });
    }

    const page = parseInt(req.body.page) || 1; // Page number, default is 1
    const limit = parseInt(req.query.limit) || 20; // Number of items per page, default is 10

    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const recordsCount = await RatingEntity.find(
      { isApproved: null },
      { _id: 1 }
    );

    const ratings = await RatingEntity.find({ isApproved: null })
      .skip(skip)
      .limit(limit);

    if (ratings.length == 0) {
      return res
        .status(404)
        .json({ success: false, result: ratings, message: "No results found" });
    }

    return res.status(200).json({
      success: true,
      result: ratings,
      currentPage: page,
      totalPages: Math.ceil(recordsCount.length / limit),
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
