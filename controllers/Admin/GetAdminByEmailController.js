import Joi from "@hapi/joi";
import AdminEntity from "../../schema/admin/AdminSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const emailValidator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GetAdminByEmailController(req, res) {
  const { email } = req.body;

  try {
    await ValidateTokenController(req, res, "admin");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ Error: error.details[0].message });
    } else {
      const adminRecord = await AdminEntity.findOne({ email: email });

      if (adminRecord == null) {
        return res.status(404).json({
          success: false,
          error: { message: "Admin not found" },
        });
      }

      res.status(200).json({
        success: true,
        result: adminRecord,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
