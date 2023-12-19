import { Schema, model, models } from "mongoose";

const ServiceTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const ServiceTypeEntity =
  models.ServiceType || model("ServiceType", ServiceTypeSchema);
export default ServiceTypeEntity;
