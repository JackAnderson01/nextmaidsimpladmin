import SignUpAdminController from "../../../controllers/Authentication/SignUpAdminController.js";
import connection from "../../../lib/connection.js";

const signUpAdmin = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await SignUpAdminController(req, res);
      break;
  }
};

export default signUpAdmin;
