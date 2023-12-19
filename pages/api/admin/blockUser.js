import BlockUserController from "../../../controllers/Admin/BlockUserController.js";
import connection from "../../../lib/connection.js";

const blockUser = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await BlockUserController(req, res);
      break;
  }
};

export default blockUser;
