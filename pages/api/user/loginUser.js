import LoginUserController from "../../../controllers/Authentication/LoginUserController.js";
import connection from "../../../lib/connection.js";

const loginUser = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await LoginUserController(req, res);
      break;
  }
};

export default loginUser;
