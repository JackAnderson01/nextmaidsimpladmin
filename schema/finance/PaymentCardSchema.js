import { Schema, model, models } from "mongoose";

const PaymentCardSchema = new Schema({
  email: { type: String, required: true },
  cardnumber: { type: Number, required: true },
  cardHolderName: { type: String, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  cvv: { type: Number, required: true },
  type: { type: String, required: true },
});

const PaymentCardEntity =
  models.PaymentCard || model("PaymentCard", PaymentCardSchema);
export default PaymentCardEntity;
