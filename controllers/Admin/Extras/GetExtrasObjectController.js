import ExtraEntity from "../../../schema/Price/ExtraSchema";
import { ValidateTokenController } from "../../Authentication/Token/ValidateTokenController";

export default async function GetExtrasObjectController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin", "cleaner", "user");

    ExtraEntity.find({})
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
