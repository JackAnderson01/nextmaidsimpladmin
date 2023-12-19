import SignUpCleanerAppleController from "../../../controllers/Authentication/Apple/SignUpCleanerAppleController.js";
import connection from "../../../lib/connection.js";

const signUpCleaner = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await SignUpCleanerAppleController(req, res);
      break;
  }
};

export default signUpCleaner;
