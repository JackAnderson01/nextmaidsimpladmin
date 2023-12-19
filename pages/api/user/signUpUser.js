import SignUpUserController from "../../../controllers/Authentication/SignUpUserController.js";
import connection from "../../../lib/connection.js";

const signup = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await SignUpUserController(req, res);
      break;
    // case "GET":
    //   let getResult = await GetUsers(req, res);
    //   break;
  }
};

export default signup;
