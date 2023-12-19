import DeleteAdminController from "../../../controllers/Admin/DeleteAdminController.js";
import connection from "../../../lib/connection.js";

const deleteAdmin = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await DeleteAdminController(req, res);
      break;
  }
};

export default deleteAdmin;
