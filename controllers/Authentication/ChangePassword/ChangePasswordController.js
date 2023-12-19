import bcrypt from "bcryptjs";
import Joi from "@hapi/joi";
import UserSignUpEntity from "../../../schema/user/UserSignUpSchema";
import ServiceProviderSignUpEntity from "../../../schema/service_provider/ServiceProviderSignupSchema";
import AdminSignUpEntity from "../../../schema/admin/AdminSignUpSchema";
import { admin } from "../../Admin/admin-authorizer";
import FireUserEntity from "../../../schema/firebase/FireUserSchema";
import { ValidateTokenController } from "../Token/ValidateTokenController";

const validator = Joi.object({
  email: Joi.string().email().required(),
  currentPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required(),
  userType: Joi.string().min(3).required(),
});

export default async function ChangePasswordController(req, res) {
  try {
    const { email, userType, newPassword, currentPassword } = req.body;

    await ValidateTokenController(req, res, "cleaner", "user", "admin");

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(newPassword, salt);

    var updatedUser = null;

    if (userType === "user") {
      updatedUser = await UserSignUpEntity.findOne({
        email: email,
      });
    } else if (userType === "cleaner") {
      updatedUser = await ServiceProviderSignUpEntity.findOne({
        email: email,
      });
    } else if (userType === "admin") {
      updatedUser = await AdminSignUpEntity.findOne({
        email: email,
      });
    }

    if (updatedUser != null) {
      const fireUser = await FireUserEntity.findOne({ email: email });

      if (fireUser != null) {
        // Re-authenticate the user with their current credentials
        const userRecord = await admin.auth().getUserByEmail(email);
        await admin.auth().updateUser(fireUser.uid, {
          email: email,
          password: currentPassword,
        });

        // User has been re-authenticated successfully
        // Now update the password
        await admin.auth().updateUser(fireUser.uid, {
          password: newPassword,
        });

        if (userType === "user") {
          await UserSignUpEntity.findOneAndUpdate(
            {
              email: email,
            },
            { password: hashedPass }
          );
        } else if (userType === "cleaner") {
          await ServiceProviderSignUpEntity.findOneAndUpdate(
            {
              email: email,
            },
            { password: hashedPass }
          );
        } else if (userType === "admin") {
          await AdminSignUpEntity.findOneAndUpdate(
            {
              email: email,
            },
            { password: hashedPass }
          );
        }

        return res
          .status(200)
          .send({ success: true, result: "Password updated successfully" });
      } else {
        return res
          .status(200)
          .send({ success: true, result: "Password updated successfully" });
      }
    } else {
      return res
        .status(401)
        .send({ success: false, error: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error in ChangePasswordController:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
