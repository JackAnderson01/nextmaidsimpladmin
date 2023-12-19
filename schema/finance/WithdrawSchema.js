import { Schema, model, models } from "mongoose";

const WithdrawSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  bankId: { type: String, required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  isWithdrawApproved: { type: Boolean },
  isWithdrawCompleted: { type: Boolean, default: false },
  transactionId: { type: String, required: true },
});

const WithdrawEntity = models.Withdraw || model("Withdraw", WithdrawSchema);
export default WithdrawEntity;
