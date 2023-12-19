import { Schema, model, models } from "mongoose";

const LocationSchema = new Schema({
  email: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, default: "USA" },
  postal: { type: String, required: false, default: "" },
});

const LocationEntity = models.Location || model("Location", LocationSchema);
export default LocationEntity;
