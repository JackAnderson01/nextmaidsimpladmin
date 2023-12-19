import Joi from "@hapi/joi";
import OTPEntity from "../../../schema/auth/OTPSchema";
import { GenerateToken } from "../Token/GenerateToken";
import UserSignUpEntity from "../../../schema/user/UserSignUpSchema";
import ServiceProviderSignUpEntity from "../../../schema/service_provider/ServiceProviderSignupSchema";
// import AdminSignUpEntity from "../../../schema/admin/AdminSignUpSchema";
// import FireUserEntity from "../../../schema/firebase/FireUserSchema";

const otpValidator = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string()
    .length(4)
    .pattern(/^[0-9]+$/)
    .required(),
});

export default async function ValidateOTPController(req, res) {
  try {
    const { email, code } = req.body;

    const { error } = await otpValidator.validateAsync(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const otpRecord = await OTPEntity.findOne({
      email,
      forPassword: { $in: [null, false] },
      hasExpired: false,
    });

    if (!otpRecord) {
      return res
        .status(400)
        .json({ success: false, error: "OTP record not found" });
    }

    if (code === otpRecord.code) {
      await OTPEntity.findOneAndUpdate(
        {
          email,
          forPassword: { $in: [null, false] },
        },
        { hasValidated: true }
      );

      const isUser = await UserSignUpEntity.findOne({ email: email });
      const isCleaner = await ServiceProviderSignUpEntity.findOne({
        email: email,
      });
      // const isAdmin = await AdminSignUpEntity.findOne({ email: email });
      // const fireUser = await FireUserEntity.findOne({ email: email });

      var payload = null;
      if (isUser !== null) {
        payload = { role: "user", email: email };
      } else if (isCleaner !== null) {
        payload = { role: "temp-cleaner", email: email };
      }
      //  else if (isAdmin !== null) {
      //   payload = { role: "admin", email: email };
      // }

      if (payload === null) {
        return res
          .status(400)
          .json({ success: false, error: "SignUp Required" });
      }

      var token = null;
      if (isCleaner !== null) {
        token = GenerateToken(payload, "1h");
      } else {
        token = GenerateToken(payload);
      }

      return res.status(200).json({
        success: true,
        message: "OTP is valid",
        token: token,
      });
    } else {
      return res.status(400).json({ success: false, error: "Invalid OTP" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
