import bcrypt from "bcryptjs";
import ServiceProviderSignUpEntity from "../../schema/service_provider/ServiceProviderSignupSchema";
import Joi from "@hapi/joi";
import OTPEntity from "../../schema/auth/OTPSchema";
import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";
import { GenerateToken } from "../Authentication/Token/GenerateToken";
import UserBlockEntity from "../../schema/admin/UserBlockSchema";

const LoginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export default async function LoginCleanerController(req, res) {
  const { email, password } = req.body;

  try {
    const { error } = await LoginValidator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: "Incorrect fields" });
    } else {
      const blockUser = await UserBlockEntity.findOne({ email: email });
      if (blockUser != null && blockUser.isDeleted == true) {
        return res
          .status(403)
          .send({ success: false, Error: "Account terminated by admin" });
      } else if (blockUser != null && blockUser.isBlocked == true) {
        return res
          .status(403)
          .send({ success: false, Error: "Account banned" });
      }

      const cleaner = await ServiceProviderSignUpEntity.findOne({
        email: req.body.email,
      });
      if (!cleaner) {
        return res
          .status(400)
          .send({ success: false, error: "Incorrect email" });
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        cleaner.password
      );
      if (!validPassword)
        return res
          .status(400)
          .send({ success: false, error: "Incorrect password" });

      const isCleanerSessionComplete = await ServiceProviderEntity.findOne({
        email: email,
        isSessionComplete: true,
      });

      if (isCleanerSessionComplete == null) {
        return res.status(403).send({
          success: false,
          error: "Profile not complete, please re-signup",
        });
      }

      const verified = await OTPEntity.findOne({
        email: email,
        hasValidated: true,
      });
      const cleanerApproved = await ServiceProviderEntity.findOne({
        email: email,
        isSessionComplete: true,
        isApproved: true,
      });

      if (verified == null) {
        return res
          .status(400)
          .send({ success: false, error: "Profile not verified" });
      }
      //TODO open this code block
      if (cleanerApproved == null) {
        return res.status(400).send({
          success: false,
          error: "Profile not approved by admin",
          isApproved: false,
        });
      } else if (cleanerApproved.isFirstLogin == true) {
        await ServiceProviderEntity.findOneAndUpdate(
          { email: email },
          { isFirstLogin: false }
        );
      }

      const payload = { role: "cleaner", email: email, password: password };

      const token = GenerateToken(payload);
      res.status(200).json({
        success: true,
        token: token,
        isFirstLogin: cleanerApproved.isFirstLogin,
      });
    }
  } catch (err) {
    res
      .status(500)
      .send({ success: false, error: err, message: "error occured" });
  }
}
