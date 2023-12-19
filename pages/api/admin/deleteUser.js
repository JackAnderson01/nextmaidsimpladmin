import DeleteUserController from "../../../controllers/Admin/DeleteUserController.js";
import connection from "../../../lib/connection.js";

const deleteUser = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await DeleteUserController(req, res);
      break;
  }
};

export default deleteUser;
