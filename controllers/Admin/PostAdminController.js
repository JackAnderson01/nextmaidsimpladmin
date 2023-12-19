import Joi from "@hapi/joi";
import AdminEntity from "../../schema/admin/AdminSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const adminValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  image: Joi.string(),
});

export default async function PostAdminController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { firstName, lastName, email, image } = req.body;
    const { error } = adminValidator.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existingAdmin = await AdminEntity.findOne({ email: email });

    if (existingAdmin) {
      const updatedAdmin = await AdminEntity.findOneAndUpdate(
        { email: email },
        {
          firstName,
          lastName,
          image,
        },
        { new: true }
      );

      if (!updatedAdmin) {
        return res
          .status(404)
          .json({ success: false, error: "Admin not updated" });
      }

      return res.status(200).json({ success: true, result: updatedAdmin });
    } else {
      const admin = new AdminEntity({
        firstName,
        lastName,
        email,
        image,
      });

      const saveAdmin = await admin.save();
      res.status(201).json({ success: true, result: saveAdmin });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
