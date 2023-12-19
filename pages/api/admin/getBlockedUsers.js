import GetBlockedUsersController from "../../../controllers/Admin/GetBlockedUsersController.js";
import connection from "../../../lib/connection.js";

const getBlockedUsers = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "GET":
      let result = await GetBlockedUsersController(req, res);
      break;
  }
};

export default getBlockedUsers;
