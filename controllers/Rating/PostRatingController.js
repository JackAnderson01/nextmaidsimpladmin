import Joi from "@hapi/joi";
import RatingEntity from "../../schema/feedback_rewards/RatingsSchema";
import BookingEntity from "../../schema/booking/BookingSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";
import UserEntity from "../../schema/user/UserSchema";
import FireUserEntity from "../../schema/firebase/FireUserSchema";
import DeleteUID from "../Firebase/DeleteUID";

const ratingValidator = Joi.object({
  bookingId: Joi.string().required(),
  userEmail: Joi.string().email().required(),
  serviceProviderEmail: Joi.string().email().required(),
  rating: Joi.number().min(1).max(5).required(),
  description: Joi.string().required(),
});

export default async function PostRatingController(req, res) {
  try {
    await ValidateTokenController(req, res, "user");

    const { bookingId, userEmail, serviceProviderEmail, rating, description } =
      req.body;

    const { error } = await ratingValidator.validateAsync(req.body);

    if (error) {
      return res.status(400).send({ Error: error.details[0].message });
    }

    const existingBooking = await BookingEntity.findOne({ _id: bookingId });
    if (!existingBooking) {
      return res
        .status(400)
        .json({ success: false, error: "Booking does not exist." });
    }

    const existingRating = await RatingEntity.findOne({ bookingId: bookingId });
    if (existingRating) {
      return res
        .status(400)
        .json({ success: false, error: "Rating already exists" });
    }

    const oldRatings = await RatingEntity.find({
      serviceProviderEmail: serviceProviderEmail,
    });
    const totalRatings = oldRatings.length;

    if (totalRatings > 0) {
      const totalRatingSum = oldRatings.reduce(
        (sum, rating) => sum + rating.rating,
        0
      );
      const averageRating = (totalRatingSum + rating) / (totalRatings + 1);

      const serviceProviderUpdate =
        await ServiceProviderEntity.findOneAndUpdate(
          { email: serviceProviderEmail },
          { rating: averageRating }
        );
    } else {
      await ServiceProviderEntity.findOneAndUpdate(
        { email: serviceProviderEmail },
        { rating: rating }
      );
    }

    const user = await UserEntity.findOne({
      email: existingBooking["userEmail"],
    });

    const ratings = new RatingEntity({
      bookingId: bookingId,
      userEmail: userEmail,
      serviceProviderEmail: serviceProviderEmail,
      rating: rating,
      description: description,
      image: user["image"],
      userName: user["name"],
    });

    const fireCleaner = await FireUserEntity.findOne({
      email: serviceProviderEmail,
    });
    const fireUser = await FireUserEntity.findOne({
      email: userEmail,
    });
    await DeleteUID(fireUser.uid, fireCleaner.uid, "users");

    const saveRatings = await ratings.save();
    res.status(200).json({ success: true, result: saveRatings });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}
