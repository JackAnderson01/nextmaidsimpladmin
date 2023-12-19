import GetAdminsController from "../../../controllers/Admin/GetAdminController.js";
import PostAdminController from "../../../controllers/Admin/PostAdminController.js";
import connection from "../../../lib/connection.js";

const postAdmin = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await PostAdminController(req, res);
      break;
    case "GET":
      let result1 = await GetAdminsController(req, res);
      break;
  }
};

export default postAdmin;
