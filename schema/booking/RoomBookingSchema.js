import { Schema, model, models } from "mongoose";

const RoomBookingSchema = new Schema({
  roomName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const RoomBookingEntity =
  models.RoomBooking || model("RoomBooking", RoomBookingSchema);
export default RoomBookingEntity;
