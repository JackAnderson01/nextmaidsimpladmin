import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema({
  email: { type: String, required: true },
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  isComplete: { type: Boolean, required: true },
});

const TransactionEntity =
  models.Transaction || model("Transaction", TransactionSchema);
export default TransactionEntity;
