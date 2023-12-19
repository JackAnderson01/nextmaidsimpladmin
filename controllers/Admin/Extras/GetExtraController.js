import ExtraEntity from "../../../schema/Price/ExtraSchema";
import { ValidateTokenController } from "../../Authentication/Token/ValidateTokenController";

export default async function GetExtrasController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin", "cleaner", "user");

    ExtraEntity.find({})
      .then((response) => {
        const extras = [];
        const prices = [];

        if (response.length > 0) {
          for (let i = 0; i < response.length; i++) {
            extras.push(response[i].serviceName);
            prices.push(response[i].price);
          }

          res.status(200).json({
            success: true,
            result: {
              names: extras,
              prices: prices,
            },
          });
        } else {
          res.status(200).json({
            success: true,
            result: {
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
