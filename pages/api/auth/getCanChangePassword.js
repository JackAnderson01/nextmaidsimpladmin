import GetCanChangePasswordController from "../../../controllers/Authentication/ChangePassword/GetCanChangePasswordController.js";
import connection from "../../../lib/connection.js";

const getCanChangePassword = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetCanChangePasswordController(req, res);
      break;
  }
};

export default getCanChangePassword;
