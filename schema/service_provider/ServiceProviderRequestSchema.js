import { Schema, model, models } from "mongoose";

const ServiceProviderRequestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  accepted: {
    type: Boolean,
    required: true,
  },
});

const ServiceProviderRequestEntity =
  models.ServiceProviderRequest ||
  model("ServiceProviderRequest", ServiceProviderRequestSchema);
export default ServiceProviderRequestEntity;
