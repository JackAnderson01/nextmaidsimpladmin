import { Schema, model, models } from "mongoose";

const OTPSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  forPassword: {
    type: Boolean,
    required: true,
  },
  expiry: {
    type: Date,
  },
  hasValidated: {
    type: Boolean,
    default: false,
  },
  hasExpired: {
    type: Boolean,
    default: false,
  },
});

const OTPEntity = models.OTP || model("OTP", OTPSchema);

export default OTPEntity;
