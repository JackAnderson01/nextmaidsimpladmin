import SignUpUserAppleController from "../../../controllers/Authentication/Apple/SignUpUserAppleController.js";
import connection from "../../../lib/connection.js";

const signUpUser = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await SignUpUserAppleController(req, res);
      break;
  }
};

export default signUpUser;
