import SignUpCleanerGoogleController from "../../../controllers/Authentication/Google/SignUpCleanerGoogleController.js";
import connection from "../../../lib/connection.js";

const signUpCleaner = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await SignUpCleanerGoogleController(req, res);
      break;
  }
};

export default signUpCleaner;
