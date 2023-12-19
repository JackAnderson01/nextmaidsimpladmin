import HowOftenEntity from "../../../schema/Price/HowOftenSchema";
import { ValidateTokenController } from "../../Authentication/Token/ValidateTokenController";

export default async function GetHowOftensController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin", "cleaner", "user");

    HowOftenEntity.find({})
      .then((response) => {
        const names = [];
        const discount = [];

        if (response.length > 0) {
          for (let i = 0; i < response.length; i++) {
            names.push(response[i].name);
            discount.push(Number((1 - response[i].discount).toFixed(2)));
          }

          res.status(200).json({
            success: true,
            result: {
              names: names,
              prices: discount,
            },
          });
        } else {
          res.status(200).json({
            success: true,
            result: {
              names: [],
              discounts: [],
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
