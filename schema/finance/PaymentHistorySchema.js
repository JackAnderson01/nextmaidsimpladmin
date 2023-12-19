import { Schema, model, models } from "mongoose";

const PaymentHistorySchema = new Schema({
  bookingId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  priceId: {
    type: String,
    required: true,
  },
  paymentIntentId: {
    type: String,
    required: true,
  },
  subscriptionId: {
    type: String,
  },
  clientSecret: {
    type: String,
  },
});

const PaymentHistoryEntity =
  models.PaymentHistory || model("PaymentHistory", PaymentHistorySchema);
export default PaymentHistoryEntity;
