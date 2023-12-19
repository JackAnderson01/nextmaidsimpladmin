import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
  },
  preferredName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  image: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  postal: {
    type: String,
  },
  state: {
    type: String,
  },
  address: {
    type: String,
  },
  referralCode: {
    type: String,
  },
  isSessionComplete: {
    type: Boolean,
    default: false,
  },
});

const UserEntity = models.User || model("User", UserSchema);
export default UserEntity;
