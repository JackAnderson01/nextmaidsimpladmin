import GetAdminWithdrawApprovedController from "../../../controllers/Finance/GetAdminWithdrawApprovedController.js";
import connection from "../../../lib/connection.js";

const getApprovedWithdraws = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "GET":
      let result = await GetAdminWithdrawApprovedController(req, res);
      break;
  }

  return res.status(405).end();
};

export default getApprovedWithdraws;
