import Joi from "@hapi/joi";
import FireUserEntity from "../../../schema/firebase/FireUserSchema";
import { ValidateTokenController } from "../Token/ValidateTokenController";

const emailValidator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GetCanChangePasswordController(req, res) {
  const { email } = req.body;

  try {
    await ValidateTokenController(req, res, "cleaner", "user", "admin");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ Error: error.details[0].message });
    } else {
      const fireUser = await FireUserEntity.findOne({ email: email });

      if (fireUser != null && fireUser.didUseEmailSignIn == true) {
        return res.status(200).json({
          success: true,
          result: true,
        });
      } else {
        return res.status(200).json({
          success: true,
          result: false,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
