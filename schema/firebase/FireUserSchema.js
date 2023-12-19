import { Schema, model, models } from "mongoose";

const FireUserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  didUseEmailSignIn: {
    type: Boolean,
    default: false,
  },
  isApple: {
    type: Boolean,
    default: false,
  },
});

const FireUserEntity = models.FireUser || model("FireUser", FireUserSchema);
export default FireUserEntity;
