import SignInCleanerGoogleController from "../../../controllers/Authentication/Google/SignInCleanerGoogleController.js";
import connection from "../../../lib/connection.js";

const signInCleaner = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await SignInCleanerGoogleController(req, res);
      break;
  }
};

export default signInCleaner;
