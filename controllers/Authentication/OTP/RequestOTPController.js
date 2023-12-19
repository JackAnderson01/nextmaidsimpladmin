import Joi from "@hapi/joi";
import OTPEntity from "../../../schema/auth/OTPSchema";
import UserSignUpEntity from "../../../schema/user/UserSignUpSchema";
import ServiceProviderSignUpEntity from "../../../schema/service_provider/ServiceProviderSignupSchema";
// import AdminSignUpEntity from "../../../schema/admin/AdminSignUpSchema";
import sendEmail from "../../Admin/sendEmail";

function generateNumericOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

const otpValidator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GenerateOTPTokenController(req, res) {
  try {
    const { email } = req.body;
    const { error } = await otpValidator.validateAsync(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const isUser = await UserSignUpEntity.findOne({ email: email });
    const isCleaner = await ServiceProviderSignUpEntity.findOne({
      email: email,
    });
    // const isAdmin = await AdminSignUpEntity.findOne({ email: email });

    if (isUser === null && isCleaner === null /*&& isAdmin === null*/) {
      return res
        .status(400)
        .json({ success: false, error: "No such email record found!" });
    }

    const otpCode = generateNumericOTP();

    const isSent = await sendEmail(
      "MaidSimpl OTP Code",
      `<p>Your OTP code is: ${otpCode}</p>`,
      email
    );

    if (isSent == false) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to send OTP email" });
    } else {
      const existingCode = await OTPEntity.findOne({
        email,
        forPassword: { $in: [null, false] },
      });

      if (existingCode) {
        const updatedOTPRecord = await OTPEntity.updateOne(
          { email, forPassword: { $in: [null, false] } },
          { code: otpCode }
        );

        expireOTP(updatedOTPRecord);
      } else {
        const currentDateTime = new Date();
        const tenMinutesFromNow = new Date(
          currentDateTime.getTime() + 60 * 60 * 1000
        ); // Add 300000 milliseconds (10 minutes)

        const otpRecord = new OTPEntity({
          code: otpCode,
          email: email,
          forPassword: false,
          expiry: tenMinutesFromNow,
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
