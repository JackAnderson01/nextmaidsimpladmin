import Joi from "@hapi/joi";
import { ValidateTokenController } from "../../Authentication/Token/ValidateTokenController";
import RoomEntity from "../../../schema/Price/RoomSchema";

const validListValues = [
  "livingroom",
  "bedroom",
  "bathroom",
  "kitchen",
  "half-bathroom",
];

// Define the validator schema
const validator = Joi.object({
  rooms: Joi.array().items(
    Joi.object({
      roomName: Joi.string()
        .valid(...validListValues)
        .required(),
      price: Joi.number().positive().required(),
      serviceType: Joi.string().valid("base", "deep").required(),
    })
  ),
});

export default async function PostRoomController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { rooms } = req.body;

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const result = [];

    for (const item of rooms) {
      const result1 = await RoomEntity.updateMany(
        { roomName: item.roomName, serviceType: item.serviceType },
        { $set: { price: item.price } },
        { upsert: true }
      );

      result.push(result1);
    }

    const updatedRecords = await RoomEntity.find({
      serviceType: rooms[0].serviceType === "base" ? "base" : "deep",
    });

    return res.status(200).send({ success: true, result: updatedRecords });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}
