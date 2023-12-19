import { Schema, model, models } from "mongoose";

const UserSignUpSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  preferredName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  referralCode: {
    type: String,
  },
  joinedAt: {
    type: Date,
    required: true,
  },
});

const UserSignUpEntity =
  models.UserSignUp || model("UserSignUp", UserSignUpSchema);
export default UserSignUpEntity;
