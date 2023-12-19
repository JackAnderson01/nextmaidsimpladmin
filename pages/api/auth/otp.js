import GenerateOTPTokenController from "../../../controllers/Authentication/OTP/RequestOTPController.js";
import ValidateOTPController from "../../../controllers/Authentication/OTP/ValidateOTPController.js";
import connection from "../../../lib/connection.js";

const otp = async (req, res) => {
  await connection();
  const method = req.method;

  const { code } = req.body;

  if (code != null && method == "POST") {
    await ValidateOTPController(req, res);
  } else {
    switch (method) {
      case "POST":
        await GenerateOTPTokenController(req, res);
        break;
    }
  }
};

export default otp;
