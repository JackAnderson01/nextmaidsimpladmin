import UserSignUpEntity from "../../../schema/user/UserSignUpSchema";
import { GenerateToken } from "../Token/GenerateToken";
import Joi from "@hapi/joi";
import UserBlockEntity from "../../../schema/admin/UserBlockSchema";
import verifyFireToken from "./verifyFireToken";
import UserEntity from "../../../schema/user/UserSchema";

const signInValidator = Joi.object({
  email: Joi.string().email().required(),
  uid: Joi.string().min(28).required(),
});

export default async function SignInUserGoogleController(req, res) {
  const { email, uid } = req.body;

  try {
    const { error } = await signInValidator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ success: false, error: error.details[0].message });
    }

    const blockUser = await UserBlockEntity.findOne({ email: email });
    if (blockUser != null && blockUser.isDeleted == true) {
      return res
        .status(403)
        .send({ success: false, error: "Account terminated by admin" });
    } else if (blockUser != null && blockUser.isBlocked == true) {
      return res.status(403).send({ success: false, error: "Account banned" });
    }

    const user = await UserSignUpEntity.findOne({ email: email });
    if (user == null) {
      return res.status(404).send({ success: false, error: "User not found" });
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

    const isValid = await verifyFireToken(uid, email, "user");

    if (isValid == false) {
      return res
        .status(400)
        .send({ success: false, error: "Please sign up, incorrect token" });
    }

    const payload = { role: "user", email: email, uid: uid };

    const token = GenerateToken(payload);
    res.status(200).json({ success: true, token: token });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, error: err, message: "Error occured" });
  }
}
