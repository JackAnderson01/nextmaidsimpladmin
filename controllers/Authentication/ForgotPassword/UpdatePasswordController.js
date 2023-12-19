import bcrypt from "bcryptjs";
import Joi from "@hapi/joi";
import OTPEntity from "../../../schema/auth/OTPSchema";
import UserSignUpEntity from "../../../schema/user/UserSignUpSchema";
import ServiceProviderSignUpEntity from "../../../schema/service_provider/ServiceProviderSignupSchema";
import AdminSignUpEntity from "../../../schema/admin/AdminSignUpSchema";
import FireUserEntity from "../../../schema/firebase/FireUserSchema";
import { admin } from "../../Admin/admin-authorizer";

const validator = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().min(8).required(),
  userType: Joi.string().min(3).required(),
});

export default async function UpdatePasswordController(req, res) {
  try {
    const { email, userType, newPassword } = req.body;

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const existingCode = await OTPEntity.findOne({
      email: email,
      forPassword: true,
      hasValidated: true,
    });

    if (existingCode && existingCode.expiry > new Date()) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(newPassword, salt);

      //Checking the userType and updating password
      var updatedUser = null;
      if (userType === "user") {
        updatedUser = await UserSignUpEntity.findOneAndUpdate(
          { email: email },
          { password: hashedPass }
        );
      } else if (userType === "cleaner") {
        updatedUser = await ServiceProviderSignUpEntity.findOneAndUpdate(
          { email: email },
          { password: hashedPass }
        );
      } else if (userType === "admin") {
        updatedUser = await AdminSignUpEntity.findOneAndUpdate(
          { email: email },
          { password: hashedPass }
        );
      }

      if (updatedUser !== null) {
        const fireUser = await FireUserEntity.findOne({ email: email });

        if (fireUser != null) {
          // Re-authenticate the user with their current credentials
          // const userRecord = await admin.auth().getUserByEmail(email);
          await admin.auth().updateUser(fireUser.uid, {
            email: email,
            password: hashedPass,
          });

          // User has been re-authenticated successfully
          // Now update the password
          await admin.auth().updateUser(fireUser.uid, {
            password: newPassword,
          });

          // if (userType === "user") {
          //   await UserSignUpEntity.findOneAndUpdate(
          //     {
          //       email: email,
          //     },
          //     { password: hashedPass }
          //   );
          // } else if (userType === "cleaner") {
          //   await ServiceProviderSignUpEntity.findOneAndUpdate(
          //     {
          //       email: email,
          //     },
          //     { password: hashedPass }
          //   );
          // } else if (userType === "admin") {
          //   await AdminSignUpEntity.findOneAndUpdate(
          //     {
          //       email: email,
          //     },
          //     { password: hashedPass }
          //   );
          // }

          return res.status(200).send({ success: true, result: updatedUser });
        } else {
          return res.status(200).send({ success: true, result: updatedUser });
        }
      } else {
        return res
          .status(404)
          .json({ success: false, error: "Password failed to update." });
      }

      //When no user is found or when update fails
      // if (updatedUser === null) {
      //   return res
      //     .status(404)
      //     .json({ success: false, error: "Password failed to update." });
      // }

      // return res.status(200).send({ success: true, result: updatedUser });
    }
    return res
      .status(200)
      .json({ success: false, error: "Update time expired." });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}
