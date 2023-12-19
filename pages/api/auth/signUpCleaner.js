import GetServiceProvidersSignUpController from "../../../controllers/Authentication/GetServiceProvidersSignUpController.js";
import SignUpCleanerController from "../../../controllers/ServiceProvider/SignUpCleanerController.js";
import connection from "../../../lib/connection.js";

const SignUpCleaner = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await SignUpCleanerController(req, res);
      break;
    case "GET":
      await GetServiceProvidersSignUpController(req, res);
      break;
  }
};

export default SignUpCleaner;
