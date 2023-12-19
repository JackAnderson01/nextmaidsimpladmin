import { Schema, model, models } from "mongoose";

const NotificationSchema = new Schema({
  registrationToken: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const NotificationEntity =
  models.Notification || model("Notification", NotificationSchema);

export default NotificationEntity;
