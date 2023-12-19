import ServiceProviderEntity from "../../../schema/service_provider/ServiceProviderSchema";
import ServiceProviderSignUpEntity from "../../../schema/service_provider/ServiceProviderSignupSchema";
import { GenerateToken } from "../Token/GenerateToken";
import Joi from "@hapi/joi";
import UserBlockEntity from "../../../schema/admin/UserBlockSchema";
import verifyFireToken from "./verifyFireToken";

const signInValidator = Joi.object({
  email: Joi.string().email().required(),
  uid: Joi.string().min(28).required(),
});

export default async function SignInCleanerGoogleController(req, res) {
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

    const cleaner = await ServiceProviderSignUpEntity.findOne({
      email: email,
    });
    if (cleaner == null) {
      return res
        .status(404)
        .send({ success: false, error: "Cleaner not found" });
    }

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

    const cleanerApproved = await ServiceProviderEntity.findOne({
      email: email,
      isSessionComplete: true,
      isApproved: true,
    });

    if (cleanerApproved == null) {
      return res.status(400).send({
        success: false,
        error: "Profile not approved by admin",
      });
    } else if (cleanerApproved.isFirstLogin == true) {
      await ServiceProviderEntity.findOneAndUpdate(
        { email: email },
        { isFirstLogin: false }
      );
    }

    const isValid = await verifyFireToken(uid, email, "cleaner");

    if (isValid == false)
      return res
        .status(400)
        .send({ success: false, error: "Please sign up, incorrect token" });

    const payload = {
      role: "cleaner",
      email: email,
      uid: uid,
    };

    const token = GenerateToken(payload);
    res.status(200).json({
      success: true,
      token: token,
      isFirstLogin: cleanerApproved.isFirstLogin,
    });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, error: err, message: "error occured" });
  }
}
