import RatingEntity from "../../schema/feedback_rewards/RatingsSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

export default async function GetRatingByBookingIdController(req, res) {
  try {
    await ValidateTokenController(req, res, "user", "cleaner");

    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid or missing bookingId" });
    }

    const ratings = await RatingEntity.findOne({
      bookingId: id,
      isApproved: true,
    });

    res.status(200).json({ success: true, result: ratings });
  } catch (err) {
    console.error("Error in GetRatingByBookingIdController:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}
