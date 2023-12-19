import { Schema, model, models } from "mongoose";

const NotificationContentSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const NotificationContentEntity =
  models.NotificationContent ||
  model("NotificationContent", NotificationContentSchema);

export default NotificationContentEntity;
