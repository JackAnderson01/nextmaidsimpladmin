import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import ScheduledNotificationEntity from "../../schema/notification/ScheduledNotificationSchema";

export default async function GetScheduledNotificationsController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    ScheduledNotificationEntity.find({})
      .then((response) => {
        if (response.length == 0) {
          res.status(404).json({
            success: false,
            result: response,
            message: "No results found",
          });
        } else {
          res.status(200).json({
            success: true,
            result: response,
          });
        }
      })
      .catch((err) => {
        res.status(422).json({
          success: false,
          error: err,
        });
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}
