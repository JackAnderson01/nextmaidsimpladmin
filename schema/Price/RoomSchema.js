import { Schema, model, models } from "mongoose";

const RoomSchema = new Schema({
  roomName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
});

const RoomEntity = models.Room || model("Room", RoomSchema);
export default RoomEntity;
