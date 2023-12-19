import { Schema, model, models } from "mongoose";

const BankDetailsSchema = new Schema({
  email: { type: String, required: true },
  bankName: { type: String, required: true },
  accountTitle: { type: String, required: true },
  routingNumber: { type: String, required: true },
  accountNumber: { type: String, required: true },
  bankCode: { type: String, required: false },
  branchCode: { type: String, required: false },
});

const BankDetailsEntity =
  models.BankDetails || model("BankDetails", BankDetailsSchema);
export default BankDetailsEntity;
