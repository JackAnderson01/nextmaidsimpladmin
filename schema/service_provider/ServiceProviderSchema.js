import { Schema, model, models } from "mongoose";

const ServiceProviderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  preferredName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  country: {
    type: String,
    default: "US",
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  postal: {
    type: String,
  },
  street: {
    type: String,
  },
  about: {
    type: String,
  },
  documents: {
    type: [String],
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
  },
  isFirstLogin: {
    type: Boolean,
    default: true,
  },
  isSessionComplete: {
    type: Boolean,
    default: false,
  },
});

const ServiceProviderEntity =
  models.ServiceProvider || model("ServiceProvider", ServiceProviderSchema);
export default ServiceProviderEntity;
