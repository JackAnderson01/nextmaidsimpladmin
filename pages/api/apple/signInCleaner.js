import SignInCleanerAppleController from "../../../controllers/Authentication/Apple/SignInCleanerAppleController.js";
import connection from "../../../lib/connection.js";

const signInCleaner = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await SignInCleanerAppleController(req, res);
      break;
  }
};

export default signInCleaner;
