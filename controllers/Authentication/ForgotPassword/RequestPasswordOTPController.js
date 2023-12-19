import Joi from "@hapi/joi";
import OTPEntity from "../../../schema/auth/OTPSchema";
import UserSignUpEntity from "../../../schema/user/UserSignUpSchema";
import ServiceProviderSignUpEntity from "../../../schema/service_provider/ServiceProviderSignupSchema";
import AdminSignUpEntity from "../../../schema/admin/AdminSignUpSchema";
import sendEmail from "../../Admin/sendEmail";

function generateNumericOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

const otpValidator = Joi.object({
  email: Joi.string().email().required(),
  userType: Joi.string().min(3).required(),
});

export default async function RequestPasswordOTPController(req, res) {
  try {
    const { email, userType } = req.body;
    const { error } = await otpValidator.validateAsync(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    var user = null;
    if (userType === "user") {
      user = await UserSignUpEntity.findOne({ email: email });
    } else if (userType === "cleaner") {
      user = await ServiceProviderSignUpEntity.findOne({ email: email });
    } else if (userType === "admin") {
      user = await AdminSignUpEntity.findOne({ email: email });
    }

    if (user === null) {
      return res
        .status(404)
        .json({ success: false, error: "No such user found" });
    }

    const otpCode = generateNumericOTP();

    const isSent = await sendEmail(
      "MaidSimpl Password OTP Code",
      `<p>Your OTP code is: ${otpCode}</p>`,
      email
    );

    if (isSent == false) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to send OTP email" });
    } else {
      const existingCode = await OTPEntity.findOne({
        email: email,
        forPassword: true,
      });

      if (existingCode) {
        const updatedOTPRecord = await OTPEntity.updateOne(
          { email: email, forPassword: true },
          { code: otpCode }
        );
        expireOTP(updatedOTPRecord);
      } else {
        const otpRecord = new OTPEntity({
          code: otpCode,
          email: email,
          forPassword: true,
          expiry: null,
        });
        await otpRecord.save();

        expireOTP(otpRecord);
      }

      return res
        .status(200)
        .json({ success: true, message: "OTP sent successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

const expireOTP = async (otpRecord) => {
  setTimeout(async () => {
    otpRecord.hasExpired = true;
    await otpRecord.save();
  }, 10 * 60 * 60 * 1000);
};
