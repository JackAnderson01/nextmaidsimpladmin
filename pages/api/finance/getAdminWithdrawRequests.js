import GetAdminWithdrawRequestsController from "../../../controllers/Finance/GetAdminWithdrawRequestsControllre.js";
import connection from "../../../lib/connection.js";

const getAdminWithdrawRequests = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "GET":
      let result = await GetAdminWithdrawRequestsController(req, res);
      break;
  }

  return res.status(405).end();
};

export default getAdminWithdrawRequests;
