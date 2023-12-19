import { Schema, model, models } from "mongoose";

const AvailabilitySchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  dateFrom: {
    type: String,
    required: true,
  },
  dateTill: {
    type: String,
    required: true,
  },
  timeFrom: {
    type: String,
    required: true,
  },
  timeTill: {
    type: String,
    required: true,
  },
  excludeWeekends: {
    type: Boolean,
    required: true,
  },
});

const AvailabilityEntity =
  models.Availability || model("Availability", AvailabilitySchema);
export default AvailabilityEntity;
