import Joi from "@hapi/joi";
import RoomEntity from "../../../schema/Price/RoomSchema";
import { ValidateTokenController } from "../../Authentication/Token/ValidateTokenController";

const validator = Joi.object({
  serviceType: Joi.string().valid("base", "deep").required(),
});

export default async function GetRoomsController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin", "cleaner", "user");

    const { serviceType } = req.body;

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    RoomEntity.find({ serviceType: serviceType })
      .then((response) => {
        const roomNames = [];
        const prices = [];

        if (response.length > 0) {
          for (let i = 0; i < response.length; i++) {
            roomNames.push(response[i].roomName);
            prices.push(response[i].price);
          }

          res.status(200).json({
            success: true,
            result: {
              serviceType: serviceType,
              names: roomNames,
              prices: prices,
            },
          });
        } else {
          res.status(200).json({
            success: true,
            result: {
              serviceType: serviceType,
              names: [],
              prices: [],
            },
          });
        }
      })
      .catch((err) => {
        res.status(422).json({
          error: err,
        });
      });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
