import SignInUserAppleController from "../../../controllers/Authentication/Apple/SignInUserAppleController.js";
import connection from "../../../lib/connection.js";

const signInUser = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await SignInUserAppleController(req, res);
      break;
  }
};

export default signInUser;
