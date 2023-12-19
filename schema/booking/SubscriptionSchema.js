import { Schema, model, models } from "mongoose";

const SubscriptionSchema = new Schema({
  email: { type: String, required: true },
  bookingId: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  totalAmountSpent: { type: Number, required: true },
  jobsCompleted: { type: Number, required: true },
  extras: { type: [String] },
  interval: { type: Number, required: true },
  SubscriptionDate: { type: String, required: true },
  lastRun: { type: Date, required: true },
  nextRun: { type: Date, required: true },
  isActive: { type: Boolean, required: true },
});

const SubscriptionEntity =
  models.Subscription || model("Subscription", SubscriptionSchema);
export default SubscriptionEntity;
