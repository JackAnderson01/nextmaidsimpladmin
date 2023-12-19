import Joi from "@hapi/joi";
import OTPEntity from "../../../schema/auth/OTPSchema";

const otpValidator = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string()
    .length(4)
    .pattern(/^[0-9]+$/)
    .required(),
});

export default async function ValidatePasswordOTPController(req, res) {
  try {
    const { email, code } = req.body;

    const { error } = await otpValidator.validateAsync(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const otpRecord = await OTPEntity.findOne({
      email,
      forPassword: true,
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
          forPassword: true,
        },
        { hasValidated: true }
      );

      const currentDateTime = new Date();
      const tenMinutesFromNow = new Date(
        currentDateTime.getTime() + 10 * 60 * 1000
      );

      const otpRecord = await OTPEntity.findOneAndUpdate(
        {
          email,
          forPassword: true,
        },
        { expiry: tenMinutesFromNow }
      );

      return res.status(200).json({ success: true, message: "OTP is valid" });
    } else {
      return res.status(400).json({ success: false, error: "Invalid OTP" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
