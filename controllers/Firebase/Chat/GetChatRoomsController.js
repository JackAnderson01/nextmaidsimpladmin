import Joi from "@hapi/joi";
import { ValidateTokenController } from "../../Authentication/Token/ValidateTokenController";
import FireUserEntity from "../../../schema/firebase/FireUserSchema";
import getChatRooms from "./getChatRooms";

const emailValidator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GetChatRoomsController(req, res) {
  const { email } = req.body;

  try {
    await ValidateTokenController(req, res, "cleaner", "user");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    } else {
      const fireRecord = await FireUserEntity.findOne({ email: email });

      if (fireRecord == null) {
        return res
          .status(404)
          .send({ success: false, error: "No fire user found" });
      }

      const chatRooms = await getChatRooms(fireRecord.uid, fireRecord.role);

      if (chatRooms == null) {
        return res.status(404).json({
          success: false,
          error: "No results found",
        });
      }

      return res.status(200).json({
        success: true,
        result: chatRooms,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}
