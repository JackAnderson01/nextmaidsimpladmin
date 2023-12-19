import SignInUserGoogleController from "../../../controllers/Authentication/Google/SignInUserGoogleController.js";
import connection from "../../../lib/connection.js";

const signInUser = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await SignInUserGoogleController(req, res);
      break;
  }
};

export default signInUser;
