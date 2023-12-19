import UpdatePasswordController from "../../../controllers/Authentication/ForgotPassword/UpdatePasswordController.js";
import connection from "../../../lib/connection.js";

const updatePassword = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await UpdatePasswordController(req, res);
      break;
  }
};

export default updatePassword;
