import { Schema, model, models } from "mongoose";

const RatingsSchema = new Schema({
  bookingId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  serviceProviderEmail: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    requried: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    requried: true,
  },
  isApproved: {
    type: Boolean,
    required: false,
  },
});

const RatingEntity = models.Rating || model("Rating", RatingsSchema);
export default RatingEntity;
