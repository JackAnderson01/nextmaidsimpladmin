import { Schema, model, models } from "mongoose";

const ScheduledNotificationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  timeZone: {
    type: String,
    required: true,
  },
  audienceType: {
    type: String,
    enum: ["all", "user", "cleaner"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ScheduledNotificationEntity =
  models.ScheduledNotification ||
  model("ScheduledNotification", ScheduledNotificationSchema);

export default ScheduledNotificationEntity;
