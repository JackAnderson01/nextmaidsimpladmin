import UserBlockEntity from "../../schema/admin/UserBlockSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

export default async function GetBlockedUsersController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    UserBlockEntity.find({ isBlocked: true })
      .then((response) => {
        res.status(200).json({
          success: true,
          result: response,
        });
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
