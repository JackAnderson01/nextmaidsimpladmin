import { Schema, model, models } from "mongoose";

const RefundedSchema = new Schema({
  bookingId: {
    type: String,
    required: true,
  },
  isRefunded: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cardDetails: {
    type: String,
    required: true,
  },
  paymentDate: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  refundAmount: {
    type: String,
    required: true,
  },
});

const RefundedEntity = models.Refunded || model("Refunded", RefundedSchema);
export default RefundedEntity;
