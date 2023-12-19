import SignUpUserGoogleController from "../../../controllers/Authentication/Google/SignUpUserGoogleController.js";
import connection from "../../../lib/connection.js";

const signUpUser = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await SignUpUserGoogleController(req, res);
      break;
  }
};

export default signUpUser;
