import ServiceTypeEntity from "../../../schema/Price/ServiceTypeSchema";
import { ValidateTokenController } from "../../Authentication/Token/ValidateTokenController";

export default async function GetServiceTypesController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin", "cleaner", "user");

    ServiceTypeEntity.find({})
      .then((response) => {
        const names = [];
        const prices = [];

        if (response.length > 0) {
          for (let i = 0; i < response.length; i++) {
            names.push(response[i].name);
            prices.push(response[i].price);
          }

          res.status(200).json({
            success: true,
            result: {
              names: names,
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
