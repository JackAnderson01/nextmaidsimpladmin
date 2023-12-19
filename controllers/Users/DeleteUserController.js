import Joi from "@hapi/joi";
import FireUserEntity from "../../schema/firebase/FireUserSchema";
import UserEntity from "../../schema/user/UserSchema";
import UserSignUpEntity from "../../schema/user/UserSignUpSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import DeleteProfile from "../Firebase/DeleteProfile";
import blackListToken from "../Authentication/Token/BlackListToken";
import NotificationContentEntity from "../../schema/notification/NotificationContentSchema";
import OTPEntity from "../../schema/auth/OTPSchema";

const emailValidator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function DeleteUserController(req, res) {
  try {
    await ValidateTokenController(req, res, "user");

    const { email } = req.body;

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    const deletionResult = await UserEntity.deleteOne({ email: email });
    const deletionResult2 = await UserSignUpEntity.deleteOne({ email: email });
    const fireUser = await FireUserEntity.findOne({ email: email });
    const deletionResult3 = await FireUserEntity.deleteOne({ email: email });
    const deletionResult5 = await OTPEntity.deleteMany({ email: email });
    const deleteNotification = await NotificationContentEntity.deleteMany({
      email: email,
    });
    if (fireUser != null) {
      const deletionResult4 = await DeleteProfile(fireUser.uid, "users");
    }

    await blackListToken(req, res);

    if (
      deletionResult.deletedCount === 0 &&
      deletionResult2.deletedCount === 0 &&
      deletionResult3.deletedCount === 0 &&
      deletionResult5.deletedCount === 0
    ) {
      res.status(404).json({
        success: false,
        message: "Email not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
