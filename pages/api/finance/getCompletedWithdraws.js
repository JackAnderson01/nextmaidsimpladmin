import GetAdminWithdrawCompletedController from "../../../controllers/Finance/GetAdminWithdrawCompletedController.js";
import connection from "../../../lib/connection.js";

const getCompletedWithdraws = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "GET":
      let result = await GetAdminWithdrawCompletedController(req, res);
      break;
  }

  return res.status(405).end();
};

export default getCompletedWithdraws;
