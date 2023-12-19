import GetEarningsHistoryController from "../../../controllers/Finance/GetEarningsHistoryController.js";
import connection from "../../../lib/connection.js";

const GetEarningsHistory = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await GetEarningsHistoryController(req, res);
      break;
  }
};

export default GetEarningsHistory;
