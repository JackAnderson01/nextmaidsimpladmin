import GetDeletedUsersController from "../../../controllers/Admin/GetDeletedUsersController.js";
import connection from "../../../lib/connection.js";

const getDeletedUsers = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "GET":
      let result = await GetDeletedUsersController(req, res);
      break;
  }
};

export default getDeletedUsers;
