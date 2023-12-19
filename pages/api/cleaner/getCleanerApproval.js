import GetCleanerApprovalController from "../../../controllers/ServiceProvider/GetApprovalStatusController.js";
import connection from "../../../lib/connection.js";

const GetCleanerApproval = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetCleanerApprovalController(req, res);
      break;
  }
};

export default GetCleanerApproval;
