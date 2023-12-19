import { Schema, model, models } from "mongoose";

const StripeCustomerSchema = new Schema({
  email: { type: String, required: true },
  customerId: { type: String, required: true },
});

const StripeCustomerEntity =
  models.StripeCustomer || model("StripeCustomer", StripeCustomerSchema);
export default StripeCustomerEntity;
