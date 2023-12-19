import { Schema, model, models } from "mongoose";

const UserBlockSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    required: true,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const UserBlockEntity = models.UserBlock || model("UserBlock", UserBlockSchema);
export default UserBlockEntity;
