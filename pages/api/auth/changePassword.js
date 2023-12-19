import ChangePasswordController from "../../../controllers/Authentication/ChangePassword/ChangePasswordController.js";
import connection from "../../../lib/connection.js";

const changePassword = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await ChangePasswordController(req, res);
      break;
  }
};

export default changePassword;
