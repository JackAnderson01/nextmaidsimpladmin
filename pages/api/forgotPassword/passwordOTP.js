import RequestPasswordOTPController from "../../../controllers/Authentication/ForgotPassword/RequestPasswordOTPController.js";
import ValidatePasswordOTPController from "../../../controllers/Authentication/ForgotPassword/ValidatePasswordOTPController.js";
import connection from "../../../lib/connection.js";

const passwordOTP = async (req, res) => {
  await connection();
  const method = req.method;

  const { code } = req.body;

  if (code != null && method == "POST") {
    await ValidatePasswordOTPController(req, res);
  } else {
    switch (method) {
      case "POST":
        await RequestPasswordOTPController(req, res);
        break;
    }
  }
};

export default passwordOTP;
