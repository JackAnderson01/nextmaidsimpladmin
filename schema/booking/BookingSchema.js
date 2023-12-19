import { Schema, model, models } from "mongoose";
import ServiceProviderRequestEntity from "../service_provider/ServiceProviderRequestSchema";
import VoucherEntity from "../feedback_rewards/VoucherSchema";
import RoomBookingEntity from "./RoomBookingSchema";

const BookingSchema = new Schema({
  servicetype: {
    type: String,
  },
  rooms: {
    type: [RoomBookingEntity.schema],
  },
  extras: {
    type: [String],
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  howoften: {
    type: String,
  },
  name: {
    type: String,
  },
  preferredName: {
    type: String,
  },
  userEmail: {
    type: String,
    required: true,
  },
  serviceProviderEmail: {
    type: String,
  },
  contact: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  comments: {
    type: String,
  },
  discount: {
    type: Number,
  },
  status: {
    type: String,
  },
  progress: {
    type: String,
  },
  serviceProvidersArray: {
    type: [ServiceProviderRequestEntity.schema],
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  voucher: {
    type: VoucherEntity.schema,
  },
  timeRequired: {
    type: String,
  },
  areDetailsComplete: {
    type: Boolean,
    default: false,
  },
  isPaymentDone: {
    type: Boolean,
    default: false,
  },
});

const BookingEntity = models.Booking || model("Booking", BookingSchema);
export default BookingEntity;
