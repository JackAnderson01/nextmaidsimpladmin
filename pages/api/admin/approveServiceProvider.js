import ApproveServiceProviderController from "../../../controllers/Admin/ApproveServiceProviderController.js";
import connection from "../../../lib/connection.js";

const approveServiceProvider = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await ApproveServiceProviderController(req, res);
      break;
  }
};

export default approveServiceProvider;
