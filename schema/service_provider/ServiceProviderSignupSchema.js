import { Schema, model, models } from "mongoose";

const ServiceProviderSignUpSchema = new Schema({
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
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  documents: {
    type: [String],
  },
  joinedAt: {
    type: Date,
    required: true,
  },
});

const ServiceProviderSignUpEntity =
  models.ServiceProviderSignUp ||
  model("ServiceProviderSignUp", ServiceProviderSignUpSchema);
export default ServiceProviderSignUpEntity;
