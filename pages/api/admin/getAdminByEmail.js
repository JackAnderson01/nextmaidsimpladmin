import GetAdminByEmailController from "../../../controllers/Admin/GetAdminByEmailController.js";
import connection from "../../../lib/connection.js";

const GetAdminByEmail = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetAdminByEmailController(req, res);
      break;
  }
};

export default GetAdminByEmail;
