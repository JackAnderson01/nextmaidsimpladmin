import bcrypt from "bcryptjs";
import SignUpEntity from "../../schema/user/UserSignUpSchema";
import Joi from "@hapi/joi";
import { GenerateToken } from "./Token/GenerateToken";
import UserBlockEntity from "../../schema/admin/UserBlockSchema";
import OTPEntity from "../../schema/auth/OTPSchema";
import UserEntity from "../../schema/user/UserSchema";

const LoginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export default async function LoginUserController(req, res) {
  const { email, password } = req.body;

  try {
    const { error } = await LoginValidator.validateAsync(req.body);

    if (error) {
      return res.status(400).send({ error: "Incorrect fields" });
    } else {
      const blockUser = await UserBlockEntity.findOne({ email: email });
      if (blockUser != null && blockUser.isDeleted == true) {
        return res.status(403).send({ Error: "Account terminated by admin" });
      } else if (blockUser != null && blockUser.isBlocked == true) {
        return res.status(403).send({ Error: "Account banned" });
      }

      const user = await SignUpEntity.findOne({ email: email });
      if (!user) {
        return res.status(400).send({ error: "Incorrect email" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).send({ error: "Incorrect password" });
      }

      const isUserSessionComplete = await UserEntity.findOne({
        email: email,
        isSessionComplete: true,
      });

      if (isUserSessionComplete == null) {
        return res.status(403).send({
          success: false,
          error: "Profile not complete, please re-signup",
        });
      }

      const userOTP = await OTPEntity.findOne({
        email: email,
        hasValidated: true,
      });

      if (userOTP == null) {
        return res
          .status(400)
          .send({ success: false, error: "Profile not verified" });
      }

      const payload = { role: "user", email: email, password: password };

      const token = GenerateToken(payload);
      res.status(200).json({
        success: true,
        token: token,
      });
    }
  } catch (err) {
    res.status(500).send({ error: err, message: "Error occured" });
  }
}
