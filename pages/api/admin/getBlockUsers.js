import GetBlockUsersController from "../../../controllers/Admin/GetBlockUsersController.js";
import connection from "../../../lib/connection.js";

const getBlockUsers = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "GET":
      let result = await GetBlockUsersController(req, res);
      break;
  }
};

export default getBlockUsers;
