import { Schema, model, models } from "mongoose";

export const ReferredUsersSchema = new Schema({
  email: { type: String, required: true },
  didOrder: { type: Number, required: true },
});

const ReferCodeSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  referredByEmail: {
    type: String,
  },
  usersReferred: {
    type: [ReferredUsersSchema],
    required: false,
  },
  vouchersGrantedOnReferral: {
    type: Number,
  },
  purchaseCount: {
    type: Number,
  },
  discountEarned: {
    type: Number,
    default: 0,
  },
});

const ReferCodeEntity = models.ReferCode || model("ReferCode", ReferCodeSchema);
export default ReferCodeEntity;
