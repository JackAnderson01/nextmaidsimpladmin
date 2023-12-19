import RatingEntity from "../../schema/feedback_rewards/RatingsSchema";
import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const emailValidator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GetRatingsByUserEmailController(req, res) {
  const { email } = req.body;

  try {
    await ValidateTokenController(req, res, "user");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      return res.status(400).send({ Error: error.details[0].message });
    }

    RatingEntity.find({ userEmail: email, isApproved: true }).then(
      (response) => {
        if (response.length != 0) {
          return res.status(200).json({
            success: true,
            result: response,
          });
        } else {
          return res.status(404).json({
            success: false,
            result: response,
            message: "No results found",
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
